// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "solady/utils/Base64.sol";
import { NFTDescriptor } from "./utils/NFTDescriptor.sol";

struct Metadata {
    string name;
    string imageText;
}

contract MugenRecipe is ERC721, Ownable, Pausable {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    string constant NAME = "MugenCraft #";
    string constant DESCRIPTION = "MugenCraft is onchain, infinte craftable NFTs, where you can craft your own NFTs.";

    mapping(uint256 => Metadata) public metadatas;
    // A,B,Hash of C
    mapping(uint256 => mapping(uint256 => bytes32)) public recipes;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor() ERC721("MugenRecipe", "MugenRecipe") Ownable(msg.sender) {}

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
    function togglePause() external onlyOwner {
        if (paused()) {
            _unpause();
        } else {
            _pause();
        }
    }

    function setDefaultRecipe(uint256 _id, string memory _name, string memory _imageText) external onlyOwner {
        _setMetaData(_id, _name, _imageText);
    }

    function setDefaultMetadata(uint256 _id, string memory _name, string memory _imageText) external onlyOwner {
        _setMetaData(_id, _name, _imageText);
    }

    function setRecipe(
        uint256 _id,
        string memory _name,
        string memory _imageText,
        uint256 _idA,
        uint256 _idB
    ) external whenNotPaused {
        _setRecipe(_id, _idA, _idB);
        _setMetaData(_id, _name, _imageText);
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

    function tokenURI(uint256 _id) public view override returns (string memory) {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
            name: string(abi.encodePacked(NAME, Strings.toString(_id), " ", metadatas[_id].name)),
            description: DESCRIPTION,
            image: generateImage(_id)
        });
        return NFTDescriptor.constructTokenURI(params);
    }

    /*//////////////////////////////////////////////////////////////
                             INTERNAL VIEW
    //////////////////////////////////////////////////////////////*/
    function isMetadataExists(uint256 _id) public view returns (bool) {
        return bytes(metadatas[_id].name).length != 0;
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
    function _setRecipe(uint256 _id, uint256 _idA, uint256 _idB) internal {
        //check materials tokens exists
        //TODO
        // if (!isMetadataExists(_idA)) {
        //     revert("MugenRecipe: tokenA not exists");
        // } else if (!isMetadataExists(_idB)) {
        //     revert("MugenRecipe: tokenB not exists");
        // }

        // arrange _idA < _idB
        if (_idA > _idB) {
            (_idA, _idB) = (_idB, _idA);
        }

        //check recipe exists
        if (recipes[_idA][_idB] != bytes32(0)) {
            revert("MugenRecipe: recipe already exists");
        }

        recipes[_idA][_idB] = keccak256(abi.encodePacked(_id));
    }

    function _setMetaData(uint256 _id, string memory _name, string memory _imageText) internal {
        if (isMetadataExists(_id)) {
            revert("MugenRecipe: token already exists");
        }

        metadatas[_id] = Metadata(_name, _imageText);
    }
}
