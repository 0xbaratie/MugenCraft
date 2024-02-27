// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { MugenRecipe } from "../src/MugenRecipe.sol";
// import { NFTDescriptor } from "../src/utils/NFTDescriptor.sol";
import { console2 } from "forge-std/console2.sol";

contract MugenTokenScript is BaseScript {
    function run() public broadcast {
        MugenRecipe recipe = new MugenRecipe();
        console2.log("recipe:", address(recipe));
        MugenToken token = new MugenToken(address(recipe));
        console2.log("token:", address(token));
    }
}
