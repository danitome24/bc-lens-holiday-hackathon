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
    error LensScoreSBT__NoSBTMintedYet(address by);
    error LensScoreSBT__LessOrSameScore(uint256 actualScore, uint256 newScore);

    event ScoreUpdated(address indexed owner, uint256 score, uint256 timestamp);
    event LensScoreSBTMinted(address indexed by, uint256 tokenId);

    struct Score {
        uint256 score; // from 0 to 1000 being 0
        uint256 timestamp;
    }

    string public constant NAME = "LensScoreSBT";
    string public constant SYMBOL = "LSBT";
    /**
     * @notice The token ID of the soul bound token.
     */
    uint256 public s_tokenId = 0;
    mapping(address owner => uint256 tokenId) private s_ownerToTokenId;
    mapping(address owner => Score score) private s_ownerToScore;

    constructor() ERC721(NAME, SYMBOL) { }

    /**
     * @notice Mints a new token to the specified address.
     * @dev Being soul bound tokens, mint of more than one per address is not allowed.
     */
    function mint() public {
        address by = msg.sender;
        if (balanceOf(by) > 0) {
            revert LensScoreSBT__AlreadyMinted(by);
        }

        s_tokenId++;
        _safeMint(by, s_tokenId);
        s_ownerToTokenId[by] = s_tokenId;
        emit LensScoreSBTMinted(by, s_tokenId);
    }

    function updateScore(uint256 score) public {
        if (balanceOf(msg.sender) == 0) {
            revert LensScoreSBT__NoSBTMintedYet(msg.sender);
        }
        if (score <= s_ownerToScore[msg.sender].score) {
            revert LensScoreSBT__LessOrSameScore(s_ownerToScore[msg.sender].score, score);
        }

        s_ownerToScore[msg.sender] = Score(score, block.timestamp);
        emit ScoreUpdated(msg.sender, score, block.timestamp);
    }

    function getScoreByAddress(address owner) public view returns (Score memory) {
        return s_ownerToScore[owner];
    }

    function _setScore(Score memory score, address to) private { }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        revert LensScoreSBT__SoulBoundToken();
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        revert LensScoreSBT__SoulBoundToken();
    }
}
