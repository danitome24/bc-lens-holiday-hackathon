// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title LensScoreSBT
 * @dev The LensScoreSBT is a soul bound token that is used to track the score of a lens.
 */
contract LensScoreSBT is ERC721 {
    struct Score {
        uint256 score;
        uint256 timestamp;
    }

    constructor() ERC721("LensScoreSBT", "LSBT") { }
}
