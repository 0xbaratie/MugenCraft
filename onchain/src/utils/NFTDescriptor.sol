// SPDX-License-Identifier: CC0

pragma solidity 0.8.23;

import { Base64 } from "solady/utils/Base64.sol";

library NFTDescriptor {
    struct TokenURIParams {
        string name;
        string description;
        // string attributes;
        string image;
    }

    function constructTokenURI(TokenURIParams memory params) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                params.name,
                                '", "description":"',
                                params.description,
                                '", "image": "data:image/svg+xml;base64,',
                                params.image,
                                '"}'
                            )
                        )
                    )
                )
            );
    }
}
