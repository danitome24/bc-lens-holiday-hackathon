// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {LensScoreSBT} from "../contracts/LensScoreSBT.sol";

contract DeployLensScoreSBT is Script {
    function run() public {
        _deployLensScoreSBT();
    }

    function _deployLensScoreSBT() private {
        vm.startBroadcast();
        LensScoreSBT lensScoreSBT = new LensScoreSBT();
        vm.stopBroadcast();
        console.log("LensScoreSBT deployed at: {}", address(lensScoreSBT));
    }
}
