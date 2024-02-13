// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { Base64 } from "solady/utils/Base64.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { MugenRecipe } from "../src/MugenRecipe.sol";

contract MugenRecipeTest is PRBTest, StdCheats {
    MugenToken internal token;
    MugenRecipe internal recipe;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        token = new MugenToken();
        recipe = new MugenRecipe(address(token));
        token.grantRole(token.MINTER_ROLE(), address(recipe));
    }

    function test_setBasicRecipe() external {
        recipe.setBasicRecipe(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        console2.log(token.uri(1));
    }

    function test_setRecipe() external {
        recipe.setBasicRecipe(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setBasicRecipe(2, "Cat", "Cat &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
        console2.log(token.uri(3));
    }
}
