// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC1155Supply, ERC1155 } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";
import { Base64 } from "solady/utils/Base64.sol";
import { NFTDescriptor } from "./utils/NFTDescriptor.sol";

contract MugenToken is ERC1155Supply, AccessControl, Pausable {
    bytes32 public constant MINTER_ROLE = bytes32(keccak256("MINTER_ROLE"));

    string name0 = "name0";
    string description0 = "description0";
    string image0 = "name0";

    constructor() ERC1155("") {
        _setRoleAdmin(DEFAULT_ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function setMetaData(
        string memory _name0,
        string memory _description0,
        string memory _image0
    ) external whenNotPaused onlyRole(MINTER_ROLE) {
        name0 = _name0;
        description0 = _description0;
        image0 = _image0;
    }

    // prettier-ignore
    function generateImage(uint256 _id)
        public
        view
        returns (string memory)
    {
        return
            Base64.encode(bytes(
                string(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 320 320"><style></style>',
                        '<rect x="150" y="30" width="10" height="10" fill="#f00"/><rect x="160" y="30" width="10" height="10" fill="#0f0"/>',
                        '<text x="150" y="70" font-size="10" fill="#000">Hey!&#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;</text>',
                        '</svg>'
                    )
                )
            ));
    }

    function uri(uint256 _id) public view override returns (string memory) {
        (string memory _name, string memory _description, string memory _image) = (name0, description0, image0);

        NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
            name: _name,
            description: _description,
            image: generateImage(_id) //TODO
        });
        return NFTDescriptor.constructTokenURI(params);
    }

    function mint(uint256 _id) external whenNotPaused onlyRole(MINTER_ROLE) {
        _mint(msg.sender, _id, 1, "");
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return
            interfaceId == type(ERC1155).interfaceId ||
            interfaceId == type(AccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function togglePause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }
}
