// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Base64 } from "@openzeppelin/contracts/utils/Base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

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
    mapping(uint256 tokenId => Score score) private s_tokenIdToScore;
    mapping(uint256 tokenId => string imageUri) private s_tokenIdToImageUri;
    string private s_imageUri;

    constructor(string memory imageUri) ERC721(NAME, SYMBOL) {
        s_imageUri = imageUri;
    }

    /**
     * @notice Mints a new token to the specified address.
     * @dev Being soul bound tokens, mint of more than one per address is not allowed.
     */
    function mint(Score calldata score, string calldata imageUri) public {
        address by = msg.sender;
        if (balanceOf(by) > 0) {
            revert LensScoreSBT__AlreadyMinted(by);
        }

        // Autoincrement NFT tokenId.
        s_tokenId++;

        // Mint SBT NFT.
        _safeMint(by, s_tokenId);
        s_ownerToTokenId[by] = s_tokenId;
        emit LensScoreSBTMinted(by, s_tokenId);

        // We set initial score.
        _setScore(score.score, s_tokenId);
        _setImageUri(imageUri, s_tokenId);
    }

    /**
     * Update Lens Score for the owner of the token.
     * @param score The new score to be updated.
     */
    function updateScore(uint256 score, string calldata imageUri) public {
        if (balanceOf(msg.sender) == 0) {
            revert LensScoreSBT__NoSBTMintedYet(msg.sender);
        }
        uint256 tokenId = s_ownerToTokenId[msg.sender];
        Score memory userScore = s_tokenIdToScore[tokenId];
        if (score <= userScore.score) {
            revert LensScoreSBT__LessOrSameScore(userScore.score, score);
        }
        _setScore(score, tokenId);
        _setImageUri(imageUri, s_ownerToTokenId[msg.sender]);
    }

    /**
     * Set the score of the owner of the token.
     * @param score Score to be set.
     * @param tokenId Token id.
     */
    function _setScore(uint256 score, uint256 tokenId) private {
        Score memory newScore = Score(score, block.timestamp);

        s_tokenIdToScore[tokenId] = newScore;
        emit ScoreUpdated(msg.sender, score, block.timestamp);
    }

    /**
     * Set imageUri for given token.
     * @param _imageUri Image uri.
     * @param tokenId Token id.
     */
    function _setImageUri(string calldata _imageUri, uint256 tokenId) private {
        s_tokenIdToImageUri[tokenId] = _imageUri;
    }

    /**
     * Get token Uri given token Id.
     * @param tokenId Token Id.
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        Score memory userScore = s_tokenIdToScore[tokenId];
        string memory userImageUri = s_tokenIdToImageUri[tokenId];

        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name": "',
                            name(),
                            '", "description": "A Soul Bound Token (SBT) that tracks a user score on the Lens network.", ',
                            '"attributes": [',
                            '{"trait_type": "score", "value": ',
                            Strings.toString(userScore.score),
                            "},",
                            '{"trait_type": "tokenId", "value": ',
                            Strings.toString(tokenId),
                            "},",
                            '{"trait_type": "lastUpdateOn", "value": ',
                            Strings.toString(userScore.timestamp),
                            "}",
                            '], "image":"',
                            userImageUri,
                            '"}'
                        )
                    )
                )
            )
        );
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    /**
     * Get the score of the owner of the token.
     * @param owner The address of the owner.
     */
    function getScoreByAddress(address owner) public view returns (Score memory) {
        uint256 tokenId = s_ownerToTokenId[owner];
        return s_tokenIdToScore[tokenId];
    }

    /**
     * Get tokenId by owner address
     * @param owner Owner's address.
     */
    function getTokenIdByAddress(address owner) public view returns (uint256) {
        return s_ownerToTokenId[owner];
    }

    /**
     * @dev Cannot transfer the token is SoulBound
     * @dev See {IERC721-transferFrom}.
     */
    function transferFrom(address from, address to, uint256 tokenId) public override {
        revert LensScoreSBT__SoulBoundToken();
    }

    /**
     * @dev Cannot transfer the token is SoulBound
     * @dev See {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        revert LensScoreSBT__SoulBoundToken();
    }
}
