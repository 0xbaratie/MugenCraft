// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC1155Supply, ERC1155 } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "solady/utils/Base64.sol";
import { NFTDescriptor } from "./utils/NFTDescriptor.sol";

struct Metadata {
    string name;
    string imageText;
}

contract MugenToken is ERC1155Supply, AccessControl, Pausable {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    bytes32 public constant MINTER_ROLE = bytes32(keccak256("MINTER_ROLE"));

    mapping(uint256 => Metadata) public metadatas;

    //TODO description
    string constant NAME = "MugenCraft #";
    string constant DESCRIPTION = "MugenCraft is onchain, infinte craftable NFTs, where you can craft your own NFTs.";

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor() ERC1155("") {
        _setRoleAdmin(DEFAULT_ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/

    //TODO for testnet
    function setMetadataAndMint(uint256 _id, string memory _name, string memory _imageText) external whenNotPaused {
        metadatas[_id] = Metadata(_name, _imageText);
        _mint(msg.sender, _id, 1, "");
    }

    function setMetaData(
        uint256 _id,
        string memory _name,
        string memory _imageText
    ) external whenNotPaused onlyRole(MINTER_ROLE) {
        metadatas[_id] = Metadata(_name, _imageText);
    }

    function mint(uint256 _id) external whenNotPaused onlyRole(MINTER_ROLE) {
        _mint(msg.sender, _id, 1, "");
    }

    function togglePause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }

    /*//////////////////////////////////////////////////////////////
                             EXTERNAL VIEW
    //////////////////////////////////////////////////////////////*/

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
                        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 320 320" style="background-color:white">',
                        '<text x="150" y="155" font-size="16" fill="#000" text-anchor="middle">',
                        metadatas[_id].imageText,
                        '</text>',
                        '</svg>'
                    )
                )
            ));
    }

    function uri(uint256 _id) public view override returns (string memory) {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
            name: string(abi.encodePacked(NAME, Strings.toString(_id), " ", metadatas[_id].name)),
            description: DESCRIPTION,
            image: generateImage(_id)
        });
        return NFTDescriptor.constructTokenURI(params);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return
            interfaceId == type(ERC1155).interfaceId ||
            interfaceId == type(AccessControl).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /*//////////////////////////////////////////////////////////////
                             INTERNAL VIEW
    //////////////////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////
                            INTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
}
