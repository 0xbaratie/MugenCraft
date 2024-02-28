// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ERC1155Supply, ERC1155 } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "solady/utils/Base64.sol";
import { NFTDescriptor } from "./utils/NFTDescriptor.sol";

interface IERC721Mintable is IERC721 {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    function metadatas(uint256 _id) external view returns (string memory, string memory, address);

    function recipes(uint256 _idA, uint256 _idB) external view returns (bytes32);

    function isMetadataExists(uint256 _id) external view returns (bool);
}

event Point(address indexed _to, uint256 _point);

contract MugenToken is ERC1155Supply, Ownable {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    string constant NAME = "MugenToken #";
    string constant DESCRIPTION = "MugenCraft is onchain, infinte craftable NFTs, where you can craft your own NFTs.";
    uint256 public constant MINT_POINT = 420;
    uint256 public constant RECIPE_CREATOR_POINT = 100;
    uint256 public constant REFFERAL_RECIPE_CREATOR_POINT = 50;

    uint256 public constant CAP = 69;

    IERC721Mintable public token;
    mapping(address => uint256) public mintPoints;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(address _token) ERC1155("") Ownable(msg.sender) {
        token = IERC721Mintable(_token);
    }

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
    function mint(address _to, uint256 _id, uint256 _idA, uint256 _idB) external {
        if (!token.isMetadataExists(_id)) {
            revert("MugenToken: metadata not exists");
        }

        // check total supply is under 69
        require(totalSupply(_id) < CAP, "MugenToken: max supply reached");
        _mint(_to, _id, 1, "");

        // points
        mintPoints[_to] += MINT_POINT;
        emit Point(_to, MINT_POINT);
        // creator points
        (, , address _creator) = token.metadatas(_id);
        if (_creator != address(0)) {
            mintPoints[_creator] += RECIPE_CREATOR_POINT;
            emit Point(_creator, RECIPE_CREATOR_POINT);
        }
        // refferal points
        (, , address _refferalA) = token.metadatas(_idA);
        if (_refferalA != address(0)) {
            mintPoints[_refferalA] += REFFERAL_RECIPE_CREATOR_POINT;
            emit Point(_refferalA, REFFERAL_RECIPE_CREATOR_POINT);
        }
        (, , address _refferalB) = token.metadatas(_idB);
        if (_refferalB != address(0)) {
            mintPoints[_refferalB] += REFFERAL_RECIPE_CREATOR_POINT;
            emit Point(_refferalB, REFFERAL_RECIPE_CREATOR_POINT);
        }
    }

    /*//////////////////////////////////////////////////////////////
                             EXTERNAL VIEW
    //////////////////////////////////////////////////////////////*/

    // prettier-ignore
    function generateImage(string memory _imageText)
        public
        pure
        returns (string memory)
    {
        return
            Base64.encode(bytes(
                string(
                    abi.encodePacked(
                        '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 320 320" style="background-color:white">',
                        '<text x="150" y="155" font-size="16" fill="#000" text-anchor="middle">',
                        _imageText,
                        '</text>',
                        '</svg>'
                    )
                )
            ));
    }

    function uri(uint256 _id) public view override returns (string memory) {
        (string memory _name, string memory _imageText,) = token.metadatas(_id);
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
            name: string(abi.encodePacked(NAME, Strings.toString(_id), " ", _name)),
            description: DESCRIPTION,
            image: generateImage(_imageText)
        });
        return NFTDescriptor.constructTokenURI(params);
    }

    /*//////////////////////////////////////////////////////////////
                             INTERNAL VIEW
    //////////////////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////
                            INTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
}
