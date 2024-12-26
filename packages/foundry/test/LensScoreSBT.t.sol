//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { Test } from "forge-std/Test.sol";
import { LensScoreSBT } from "../contracts/LensScoreSBT.sol";

contract LensScoreSBTTest is Test {
    LensScoreSBT lensScoreSBT;
    address USER_ONE = makeAddr("USER_ONE");
    address USER_TWO = makeAddr("USER_TWO");

    function setUp() public {
        lensScoreSBT = new LensScoreSBT();
    }

    function testInitialState() public view {
        uint256 initialTokenId = 0;

        assertEq(lensScoreSBT.NAME(), "LensScoreSBT");
        assertEq(lensScoreSBT.SYMBOL(), "LSBT");
        assertEq(lensScoreSBT.s_tokenId(), initialTokenId);
    }

    function testMint() public {
        uint256 tokenIdMinted = 1;

        lensScoreSBT.mint(USER_ONE);
        assertEq(lensScoreSBT.balanceOf(USER_ONE), tokenIdMinted);
        assertEq(lensScoreSBT.s_tokenId(), tokenIdMinted);
        assertEq(lensScoreSBT.ownerOf(tokenIdMinted), USER_ONE);
    }

    function testMintAlreadyMinted() public {
        lensScoreSBT.mint(USER_ONE);
        vm.expectRevert(abi.encodeWithSelector(LensScoreSBT.LensScoreSBT__AlreadyMinted.selector, USER_ONE));
        lensScoreSBT.mint(USER_ONE);
    }

    function testSoulBoundTokenTransfer() public {
        uint256 tokenIdMinted = 1;

        lensScoreSBT.mint(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.transferFrom(USER_ONE, USER_TWO, tokenIdMinted);
    }

    function testSafeSoulBoundTokenTransfer() public {
        uint256 tokenIdMinted = 1;

        lensScoreSBT.mint(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.safeTransferFrom(USER_ONE, USER_TWO, tokenIdMinted);
    }

    function testSafeSoulBoundTokenTransferWithData() public {
        uint256 tokenIdMinted = 1;
        lensScoreSBT.mint(USER_ONE);
        vm.expectRevert(LensScoreSBT.LensScoreSBT__SoulBoundToken.selector);
        lensScoreSBT.safeTransferFrom(USER_ONE, USER_TWO, tokenIdMinted, "");
    }
}
