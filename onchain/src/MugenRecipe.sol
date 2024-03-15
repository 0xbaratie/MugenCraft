// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "solady/utils/Base64.sol";
import { NFTDescriptor } from "./utils/NFTDescriptor.sol";
// import { console2 } from "forge-std/console2.sol";

struct Metadata {
    string name;
    string imageText;
    address creator;
}

event RecipePoint(address indexed _to, uint256 _point);
event RecipeCreated(address indexed _creator, uint256 indexed _id, string _name, string _imageText, uint256 _idA, uint256 _idB);

contract MugenRecipe is ERC721, Ownable, Pausable {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    uint256 public constant RECIPE_CREATE_POINT = 200;

    string constant NAME = "MugenCraft Recipe #";
    string constant DESCRIPTION = "This NFT is issued to the recipe creator when a recipe is defined on MugenCraft. \\nMugen Craft is an endless crafting onchain game that allows players to create, craft, and mint recipes. Join the game now at https://mugencraft.vercel.app/";

    mapping(uint256 => Metadata) public metadatas;
    // A,B,Hash of C
    mapping(uint256 => mapping(uint256 => bytes32)) public recipes;
    mapping(address => uint256) public recipePoints;

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

    function setDefaultRecipe(uint256 _id, uint256 _idA, uint256 _idB) external onlyOwner {
        _setRecipe(_id, _idA, _idB);
    }

    function setDefaultMetadata(uint256 _id, string memory _name, string memory _imageText) external onlyOwner {
        _setMetaData(_id, _name, _imageText, address(0));
    }

    function setDefaultMetadatas(uint256[] memory _id, string[] memory _name, string[] memory _imageText) external onlyOwner {
        for(uint i = 0; i < _id.length; i++){
            _setMetaData(_id[i], _name[i], _imageText[i], address(0));
        }
    }

    function setRecipe(
        uint256 _id,
        string memory _name,
        string memory _imageText,
        uint256 _idA,
        uint256 _idB
    ) external whenNotPaused {
        _setRecipe(_id, _idA, _idB);
        _setMetaData(_id, _name, _imageText, msg.sender);
        _mint(msg.sender, _id);
        recipePoints[msg.sender] += RECIPE_CREATE_POINT;
        emit RecipePoint(msg.sender, RECIPE_CREATE_POINT);
        emit RecipeCreated(msg.sender, _id, _name, _imageText, _idA, _idB);
    }

    /*//////////////////////////////////////////////////////////////
                             EXTERNAL VIEW
    //////////////////////////////////////////////////////////////*/

    // prettier-ignore
    function generateImage(string memory _imageText, address _creator)
        public
        pure
        returns (string memory)
    {
        return
            Base64.encode(bytes(
                string(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 320 320" style="background-color:white">',
                        '<text x="150" y="140" font-size="12" fill="#000" text-anchor="middle">',
                        Strings.toHexString(_creator),
                        '</text>',
                        '<text x="150" y="170" font-size="16" fill="#000" text-anchor="middle">',
                        _imageText,
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
            image: generateImage(metadatas[_id].imageText, metadatas[_id].creator)
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

    function _setMetaData(uint256 _id, string memory _name, string memory _imageText, address _creator) internal {
        if (isMetadataExists(_id)) {
            revert("MugenRecipe: token already exists");
        }

        metadatas[_id] = Metadata(_name, _imageText, _creator);
    }
}
