// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Test } from "forge-std/Test.sol";
import { LensScoreSBT } from "../contracts/LensScoreSBT.sol";

contract LensScoreSBTTest is Test {
    LensScoreSBT lensScoreSBT;
    address USER_ONE = address(0x1);
    address USER_TWO = address(0x2);

    function setUp() public {
        lensScoreSBT = new LensScoreSBT("");
    }

    function testInitialState() public {
        uint256 initialTokenId = 0;

        assertEq(lensScoreSBT.NAME(), "LensScoreSBT");
        assertEq(lensScoreSBT.SYMBOL(), "LSBT");
        assertEq(lensScoreSBT.s_tokenId(), initialTokenId);
    }

    function testMint() public {
        uint256 tokenIdMinted = 1;
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(500, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        assertEq(lensScoreSBT.balanceOf(USER_ONE), 1);
        assertEq(lensScoreSBT.s_tokenId(), tokenIdMinted);
        assertEq(lensScoreSBT.ownerOf(tokenIdMinted), USER_ONE);
        assertEq(lensScoreSBT.getScoreByAddress(USER_ONE).score, initialScore.score);
    }

    function testRevertsIfSBTAlreadyMinted() public {
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(500, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        vm.prank(USER_ONE);
        vm.expectRevert(abi.encodeWithSelector(LensScoreSBT.LensScoreSBT__AlreadyMinted.selector, USER_ONE));
        lensScoreSBT.mint(initialScore);
    }

    function testRevertsIfTriesToTransferSBT() public {
        uint256 tokenIdMinted = 1;
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(500, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        vm.prank(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.transferFrom(USER_ONE, USER_TWO, tokenIdMinted);
    }

    function testRevertsIfTriesToSafeTransferSBT() public {
        uint256 tokenIdMinted = 1;
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(500, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        vm.prank(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.safeTransferFrom(USER_ONE, USER_TWO, tokenIdMinted);
    }

    function testRevertsIfTriesToSafeTransferWithDataSBT() public {
        uint256 tokenIdMinted = 1;
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(500, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        vm.prank(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.safeTransferFrom(USER_ONE, USER_TWO, tokenIdMinted, "");
    }

    function testUpdateScore() public {
        uint256 initialScoreValue = 500;
        uint256 newScoreValue = 600;
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(initialScoreValue, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        vm.prank(USER_ONE);
        lensScoreSBT.updateScore(newScoreValue);
        assertEq(lensScoreSBT.getScoreByAddress(USER_ONE).score, newScoreValue);
    }

    function testRevertsTryingToUpdateNoMintedSBT() public {
        uint256 score = 500;

        vm.prank(USER_ONE);
        vm.expectRevert(abi.encodeWithSelector(LensScoreSBT.LensScoreSBT__NoSBTMintedYet.selector, USER_ONE));
        lensScoreSBT.updateScore(score);
    }

    function testRevertsTryingToUpdateLessOrEqualScore() public {
        uint256 initialScoreValue = 500;
        uint256 newScoreValue = 400;
        LensScoreSBT.Score memory initialScore = LensScoreSBT.Score(initialScoreValue, block.timestamp);

        vm.prank(USER_ONE);
        lensScoreSBT.mint(initialScore);
        vm.prank(USER_ONE);
        vm.expectRevert(
            abi.encodeWithSelector(
                LensScoreSBT.LensScoreSBT__LessOrSameScore.selector, initialScoreValue, initialScoreValue
            )
        );
        lensScoreSBT.updateScore(initialScoreValue);

        vm.prank(USER_ONE);
        vm.expectRevert(
            abi.encodeWithSelector(
                LensScoreSBT.LensScoreSBT__LessOrSameScore.selector, initialScoreValue, newScoreValue
            )
        );
        lensScoreSBT.updateScore(newScoreValue);
    }
}
