// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { NFTDescriptor } from "../src/utils/NFTDescriptor.sol";
import { console2 } from "forge-std/console2.sol";

contract MugenTokenScript is BaseScript {
    function run() public broadcast {
        MugenToken token = new MugenToken();
        console2.log(address(token));
    }
}
