// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

interface IERC1155Mintable is IERC1155 {
    function setMetaData(uint256 _id, string memory _name, string memory _imageText) external;

    function mint(uint256 _id) external;

    function uri(uint256 _id) external view returns (string memory);

    function metadatas(uint256 _id) external view returns (string memory, string memory);
}

contract MugenRecipe is Ownable {
    IERC1155Mintable public token;

    constructor(address _token) Ownable(msg.sender) {
        token = IERC1155Mintable(_token);
    }

    // A,B,Hash of C
    mapping(uint256 => mapping(uint256 => bytes32)) public recipe;

    function _setMetaDataForToken(uint256 _id, string memory _name, string memory _imageText) internal {
        //check recipe token not exists
        string memory _existingName;
        (_existingName, ) = token.metadatas(_id);

        //if _existingName is not empty, then tokenID already exists
        if (bytes(_existingName).length != 0) {
            revert("MugenRecipe: token already exists");
        }

        token.setMetaData(_id, _name, _imageText);
    }

    function setDefaultRecipe(uint256 _id, string memory _name, string memory _imageText) external onlyOwner {
        _setMetaDataForToken(_id, _name, _imageText);
    }

    function setRecipe(
        uint256 _id,
        string memory _name,
        string memory _imageText,
        uint256 _idA,
        uint256 _idB
    ) external {
        //check materials tokens exists
        if (bytes(token.uri(_idA)).length == 0) {
            revert("MugenRecipe: tokenA not exists");
        } else if (bytes(token.uri(_idB)).length == 0) {
            revert("MugenRecipe: tokenB not exists");
        }

        // arrange _idA < _idB
        if (_idA > _idB) {
            (_idA, _idB) = (_idB, _idA);
        }

        //check recipe exists
        if (recipe[_idA][_idB] != bytes32(0)) {
            revert("MugenRecipe: recipe already exists");
        }

        recipe[_idA][_idB] = keccak256(abi.encodePacked(_id));
        _setMetaDataForToken(_id, _name, _imageText);
    }
}
