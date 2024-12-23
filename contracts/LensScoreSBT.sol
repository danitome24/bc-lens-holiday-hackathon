// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title LensScoreSBT
 * @dev The LensScoreSBT is a soul bound token that is used to track the score of a lens.
 */
contract LensScoreSBT {
    string message = "LensScoreSBT hello world";

    function getMessage() public view returns (string memory) {
        return message;
    }
}
