// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { Base64 } from "solady/utils/Base64.sol";
import { MugenToken } from "../src/MugenToken.sol";

contract MugenTokenTest is PRBTest, StdCheats {
    MugenToken internal token;
    address internal alice;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        alice = address(0x1);
        token = new MugenToken();
    }

    /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function test_uri() external {
        string memory uri = token.uri(0);
        console2.log(uri);
        // console2.log(string(Base64.decode(uri)));
    }

    //TODO for testnet
    function test_setMetadataAndMint() external {
        vm.prank(alice);
        token.setMetadataAndMint(1, "Dog", "Dog &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        // console2.log(token.uri(1));
        vm.prank(alice);
        token.setMetadataAndMint(1, "Cat", "Cat &#x1f34b;&#x1f34c;&#x1f363;&#x1F607;&#x1f408;");
        console2.log(token.uri(1));
    }
}
