// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { ERC1155Supply, ERC1155 } from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

interface IERC721Mintable is IERC721 {
    function tokenURI(uint256 tokenId) external view returns (string memory);

    function metadatas(uint256 _id) external view returns (string memory, string memory);

    function recipes(uint256 _idA, uint256 _idB) external view returns (bytes32);

    function isMetadataExists(uint256 _id) external view returns (bool);
}

contract MugenToken is ERC1155Supply, Ownable {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/
    IERC721Mintable public token;
    uint256 constant CAP = 69;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/
    constructor(address _token) ERC1155("") Ownable(msg.sender) {
        token = IERC721Mintable(_token);
    }

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
    //TODO check recipe
    function mint(address _to, uint256 _id) external {
        if (!token.isMetadataExists(_id)) {
            revert("MugenToken: metadata not exists");
        }
        // check total supply is under 69
        require(totalSupply(_id) < CAP, "MugenToken: max supply reached");
        _mint(_to, _id, 1, "");
    }

    /*//////////////////////////////////////////////////////////////
                             EXTERNAL VIEW
    //////////////////////////////////////////////////////////////*/
    function uri(uint256 _id) public view override returns (string memory) {
        return token.tokenURI(_id);
    }

    /*//////////////////////////////////////////////////////////////
                             INTERNAL VIEW
    //////////////////////////////////////////////////////////////*/

    /*//////////////////////////////////////////////////////////////
                            INTERNAL UPDATE
    //////////////////////////////////////////////////////////////*/
}
