// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title LensScoreSBT
 * @dev The LensScoreSBT is a soul bound token that is used to track the score of a lens.
 */
contract LensScoreSBT is ERC721 {
    error LensScoreSBT__SoulBoundToken();
    error LensScoreSBT__AlreadyMinted(address by);

    struct Score {
        uint256 score;
        uint256 timestamp;
    }

    string public constant NAME = "LensScoreSBT";
    string public constant SYMBOL = "LSBT";
    /**
     * @notice The token ID of the soul bound token.
     */
    uint256 public s_tokenId = 0;
    mapping(address owner => uint256 tokenId) private s_ownerToTokenId;

    constructor() ERC721(NAME, SYMBOL) { }

    /**
     * @notice Mints a new token to the specified address.
     * @param to The address to mint the token to.
     * @dev Being soul bound tokens, mint of more than one per address is not allowed.
     */
    function mint(address to) public {
        if (balanceOf(to) > 0) {
            revert LensScoreSBT__AlreadyMinted(to);
        }

        s_tokenId++;
        _safeMint(to, s_tokenId);
        s_ownerToTokenId[to] = s_tokenId;
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        revert LensScoreSBT__SoulBoundToken();
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        revert LensScoreSBT__SoulBoundToken();
    }
}
