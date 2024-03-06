// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { Base64 } from "solady/utils/Base64.sol";
import { MugenToken } from "../src/MugenToken.sol";
import { MugenRecipe } from "../src/MugenRecipe.sol";

contract MugenRecipeTest is PRBTest, StdCheats {
    address internal alice = address(0x1);
    address internal bob = address(0x2);
    address internal charlie = address(0x3);

    MugenRecipe internal recipe;
    MugenToken internal token;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
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
        token.mint{ value: 0.000025 ether }(msg.sender, 1, 987, 987);
        assertEq(token.balanceOf(msg.sender, 1), 1);
    }

    function test_mint_Fail1() external {
        vm.expectRevert("MugenToken: metadata not exists");
        token.mint{ value: 0.000025 ether }(msg.sender, 1, 987, 987);
    }

    function test_mint_Fail2() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        token.mint{ value: 0.000025 ether }(msg.sender, 1, 987, 987);
        vm.expectRevert("MugenToken: already minted");
        token.mint{ value: 0.000025 ether }(msg.sender, 1, 987, 987);
    }

    // function test_mint_Fail3() external {
    //     recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
    //     for (uint8 i = 0; i < 69; i++) {
    //         // each 69 address can mint 1 token
    //         token.mint{ value: 0.000025 ether }(address(uint160(uint256(keccak256(abi.encodePacked(i))))), 1, 987, 987);
    //     }
    //     vm.expectRevert("MugenToken: max supply reached");
    //     token.mint{ value: 0.000025 ether }(msg.sender, 1, 987, 987);
    // }

    struct MetadataTest {
        uint256 id;
        string name;
        string imageText;
    }

    function test_setDefaultMetadatas() external {
        MetadataTest[3] memory metadatas = [
            MetadataTest(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;"),
            MetadataTest(2, "Cat", "Cat &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;"),
            MetadataTest(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;")
        ];
        uint256 len = metadatas.length;

        uint256[] memory ids = new uint256[](len);
        string[] memory names = new string[](len);
        string[] memory imageTexts = new string[](len);

        for (uint256 i = 0; i < len; i++) {
            ids[i] = metadatas[i].id;
            names[i] = metadatas[i].name;
            imageTexts[i] = metadatas[i].imageText;
        }
        recipe.setDefaultMetadatas(ids, names, imageTexts);
    }

    function test_points_Success() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        recipe.setDefaultMetadata(2, "Cat", "Cat &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");

        recipe.setRecipe(3, "Sheep", "Sheep &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;", 1, 2);
        assertEq(recipe.recipePoints(address(this)), recipe.RECIPE_CREATE_POINT());

        vm.prank(alice);
        recipe.setRecipe(4, "Sheep4", "Sheep &#x1f34b;", 1, 3);

        vm.prank(bob);
        recipe.setRecipe(5, "Sheep5", "Sheep &#x1f34b;", 1, 4);

        //send eth to charlie
        deal(charlie, 0.000025 ether);
        vm.prank(charlie);
        token.mint{ value: 0.000025 ether }(charlie, 5, 3, 4);
        assertEq(token.mintPoints(charlie), token.MINT_POINT());
        assertEq(token.recipeCreatorPoints(bob), token.RECIPE_CREATOR_POINT());
        assertEq(token.refferalRecipeCreatorPoints(address(this)), token.REFFERAL_RECIPE_CREATOR_POINT());
        assertEq(token.refferalRecipeCreatorPoints(alice), token.REFFERAL_RECIPE_CREATOR_POINT());
    }

    function test_withdrawFee_Success() external {
        recipe.setDefaultMetadata(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");

        deal(alice, 0.000025 ether);
        vm.prank(alice);
        token.mint{ value: 0.000025 ether }(msg.sender, 1, 987, 987);

        console2.log("this balance", address(this).balance);
        token.withdrawFee();
        console2.log("this balance", address(this).balance);
    }

    fallback() external payable {}

    receive() external payable {}
}
