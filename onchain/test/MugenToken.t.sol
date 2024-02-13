// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { PRBTest } from "@prb/test/src/PRBTest.sol";
import { console2 } from "forge-std/console2.sol";
import { StdCheats } from "forge-std/StdCheats.sol";

import { Base64 } from "solady/utils/Base64.sol";
import { MugenToken } from "../src/MugenToken.sol";

contract MugenTokenTest is PRBTest, StdCheats {
    MugenToken internal token;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        token = new MugenToken();
    }

    /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function test_uri() external {
        string memory uri = token.uri(0);
        console2.log(uri);
        // console2.log(string(Base64.decode(uri)));
    }
}
