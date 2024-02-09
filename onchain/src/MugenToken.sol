// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC1155Supply, ERC1155 } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";

contract MugenToken is ERC1155Supply, AccessControl, Pausable {
    bytes32 public constant MINTER_ROLE = bytes32(keccak256("MINTER_ROLE"));

    string name0 = "";
    string description0 = "";
    string imageURI0 = "";

    constructor() ERC1155("") {
        _setRoleAdmin(DEFAULT_ADMIN_ROLE, DEFAULT_ADMIN_ROLE);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function setMetaData(
        string memory _name0,
        string memory _description0,
        string memory _imageURI0
    ) external whenNotPaused onlyRole(MINTER_ROLE) {
        name0 = _name0;
        description0 = _description0;
        imageURI0 = _imageURI0;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        (string memory _name, string memory _description, string memory _imageURI) = (name0, description0, imageURI0);
        return
            string(
                abi.encodePacked(
                    "data:application/json;utf8,",
                    "{",
                    '"name":"',
                    _name,
                    '",',
                    '"description":"',
                    _description,
                    '",',
                    '"image": "',
                    _imageURI,
                    '"}'
                )
            );
    }

    function mint(uint256 _id) external whenNotPaused onlyRole(MINTER_ROLE) {
        _mint(msg.sender, _id, 1, "");
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function togglePause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }
}
