// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23 <0.9.0;

import { BaseScript } from "./Base.s.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { MugenRecipe } from "../src/MugenRecipe.sol";
// import { NFTDescriptor } from "../src/utils/NFTDescriptor.sol";
import { console2 } from "forge-std/console2.sol";

contract InsertTokenScript is BaseScript {
    function run() public broadcast {
        MugenRecipe recipe = MugenRecipe(0x05421Fe1993581536da827f5D5C73Bb667b55dd5);
        recipe.claimMyContractsGas();
    }
}
