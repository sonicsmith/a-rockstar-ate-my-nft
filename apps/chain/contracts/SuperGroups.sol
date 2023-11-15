// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISuperGroups.sol";

contract SuperGroups is ISuperGroups, ERC721, Ownable {
    uint256 private _nextTokenId;
    address private _gameContract;

    mapping(uint256 => SuperGroupInfo) private _superGroupInfo;

    modifier onlyGameContract() {
        require(msg.sender == _gameContract);
        _;
    }

    constructor(
        address gameContract
    ) ERC721("SuperGroups", "SPG") Ownable(msg.sender) {
        _gameContract = gameContract;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://rockstar/";
    }

    function safeMint(
        address to,
        string[] memory artistIds,
        uint256 numberOfFollowers
    ) external onlyGameContract {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _superGroupInfo[tokenId].artistIds = artistIds;
        _superGroupInfo[tokenId].numberOfFollowers = numberOfFollowers;
    }

    function burn(uint256 tokenId) external onlyGameContract {
        _burn(tokenId);
    }

    function getSuperGroupInfo(
        uint256 tokenId
    ) public view returns (SuperGroupInfo memory) {
        return _superGroupInfo[tokenId];
    }
}
