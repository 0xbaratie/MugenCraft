// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { Base64 } from "solady/utils/Base64.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { MugenRecipe } from "../src/MugenRecipe.sol";

contract MugenRecipeTest is PRBTest, StdCheats {
    address internal alice;

    MugenRecipe internal recipe;
    MugenToken internal token;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        alice = address(0x1);
        recipe = new MugenRecipe();
        token = new MugenToken(address(recipe));
    }

    function test_setDefaultMetadata() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        console2.log(recipe.tokenURI(1));
    }

    function test_setRecipe_Success() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setDefaultMetadata(2, "Cat", "Cat &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
        console2.log(recipe.tokenURI(3));
    }

    // function test_setRecipe_Fail1() external {
    //     vm.expectRevert("MugenRecipe: tokenA not exists");
    //     recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
    // }

    // function test_setRecipe_Fail2() external {
    //     recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
    //     vm.expectRevert("MugenRecipe: tokenB not exists");
    //     recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
    // }

    function test_setRecipe_Fail3() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setDefaultMetadata(2, "Cat", "Cat &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
        vm.expectRevert("MugenRecipe: recipe already exists");
        recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
    }

    function test_setMetadataAndMint() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        console2.log(recipe.tokenURI(1));
        console2.log(token.uri(1));
    }

    function test_mint_Success() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        token.mint(msg.sender, 1, 987, 987);
        assertEq(token.balanceOf(msg.sender, 1), 1);
    }

    function test_mint_Fail1() external {
        vm.expectRevert("MugenToken: metadata not exists");
        token.mint(msg.sender, 1, 987, 987);
    }

    function test_mint_Fail2() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        for (uint8 i = 0; i < 69; i++) token.mint(msg.sender, 1, 987, 987);
        vm.expectRevert("MugenToken: max supply reached");
        token.mint(msg.sender, 1, 987, 987);
    }
}
