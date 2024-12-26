// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Test } from "forge-std/Test.sol";
import { LensScoreSBT } from "../contracts/LensScoreSBT.sol";

contract LensScoreSBTTest is Test {
    LensScoreSBT lensScoreSBT;
    address USER_ONE = address(0x1);
    address USER_TWO = address(0x2);

    function setUp() public {
        lensScoreSBT = new LensScoreSBT();
    }

    function testInitialState() public {
        uint256 initialTokenId = 0;

        assertEq(lensScoreSBT.NAME(), "LensScoreSBT");
        assertEq(lensScoreSBT.SYMBOL(), "LSBT");
        assertEq(lensScoreSBT.s_tokenId(), initialTokenId);
    }

    function testMint() public {
        uint256 tokenIdMinted = 1;

        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        assertEq(lensScoreSBT.balanceOf(USER_ONE), 1);
        assertEq(lensScoreSBT.s_tokenId(), tokenIdMinted);
        assertEq(lensScoreSBT.ownerOf(tokenIdMinted), USER_ONE);
    }

    function testRevertsIfSBTAlreadyMinted() public {
        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        vm.prank(USER_ONE);
        vm.expectRevert(abi.encodeWithSelector(LensScoreSBT.LensScoreSBT__AlreadyMinted.selector, USER_ONE));
        lensScoreSBT.mint();
    }

    function testRevertsIfTriesToTransferSBT() public {
        uint256 tokenIdMinted = 1;

        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        vm.prank(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.transferFrom(USER_ONE, USER_TWO, tokenIdMinted);
    }

    function testRevertsIfTriesToSafeTransferSBT() public {
        uint256 tokenIdMinted = 1;

        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        vm.prank(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.safeTransferFrom(USER_ONE, USER_TWO, tokenIdMinted);
    }

    function testRevertsIfTriesToSafeTransferWithDataSBT() public {
        uint256 tokenIdMinted = 1;

        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        vm.prank(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.safeTransferFrom(USER_ONE, USER_TWO, tokenIdMinted, "");
    }

    function testUpdateScore() public {
        uint256 initialScore = 500;
        uint256 newScore = 600;

        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        vm.prank(USER_ONE);
        lensScoreSBT.updateScore(initialScore);
        assertEq(lensScoreSBT.getScoreByAddress(USER_ONE).score, initialScore);

        vm.prank(USER_ONE);
        lensScoreSBT.updateScore(newScore);
        assertEq(lensScoreSBT.getScoreByAddress(USER_ONE).score, newScore);
    }

    function testRevertsTryingToUpdateNoMintedSBT() public {
        uint256 score = 500;

        vm.prank(USER_ONE);
        vm.expectRevert(abi.encodeWithSelector(LensScoreSBT.LensScoreSBT__NoSBTMintedYet.selector, USER_ONE));
        lensScoreSBT.updateScore(score);
    }

    function testRevertsTryingToUpdateLessOrEqualScore() public {
        uint256 initialScore = 500;
        uint256 newScore = 400;

        vm.prank(USER_ONE);
        lensScoreSBT.mint();
        vm.prank(USER_ONE);
        lensScoreSBT.updateScore(initialScore);

        vm.prank(USER_ONE);
        vm.expectRevert(
            abi.encodeWithSelector(LensScoreSBT.LensScoreSBT__LessOrSameScore.selector, initialScore, newScore)
        );
        lensScoreSBT.updateScore(newScore);
    }
}
