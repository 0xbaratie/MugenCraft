// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

interface IERC1155Mintable is IERC1155 {
    function setMetaData(string memory _name0, string memory _description0, string memory _imageURI0) external;

    function mint(uint256 _id) external;

    function uri(uint256 _id) external view returns (string memory);
}

contract MugenRecipe {
    IERC1155Mintable public token;

    constructor(address _token) {
        token = IERC1155Mintable(_token);
    }

    // A,B,Hash of C
    mapping(uint256 => mapping(uint256 => bytes32)) public recipe;

    function setRecipe(uint256 _idA, uint256 _idB, uint256 _idC) external {
        //check materials tokens exists
        if (bytes(token.uri(_idA)).length == 0) {
            revert("MugenRecipe: tokenA not exists");
        } else if (bytes(token.uri(_idB)).length == 0) {
            revert("MugenRecipe: tokenB not exists");
        }

        //check recipe token not exists
        if (bytes(token.uri(_idC)).length == 0) {
            revert("MugenRecipe: tokenC exists");
        }

        // arrange _idA < _idB
        if (_idA > _idB) {
            (_idA, _idB) = (_idB, _idA);
        }

        //check recipe exists
        if (recipe[_idA][_idB] != 0) {
            revert("MugenRecipe: recipe exists");
        }

        recipe[_idA][_idB] = keccak256(abi.encodePacked(_idC));
        //TODO set metadata
        token.setMetaData("Mugen", "Description", "https://example.com/image.png");
    }
}
