// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISupergroups.sol";

contract Supergroups is ISupergroups, ERC721, Ownable {
    uint256 public _nextTokenId = 1;
    address private _gameContract;

    mapping(uint256 => SupergroupInfo) private _supergroupInfo;

    modifier onlyGameContract() {
        require(msg.sender == _gameContract);
        _;
    }

    constructor(
        address gameContract
    ) ERC721("Supergroups", "SPG") Ownable(msg.sender) {
        _gameContract = gameContract;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://a-rockstar-ate-my-nft-web-sonicsmith.vercel.app/api/tokenId/";
    }

    function safeMint(
        address to,
        string[] memory artistIds,
        uint256 numberOfFollowers
    ) external onlyGameContract {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _supergroupInfo[tokenId].artistIds = artistIds;
        _supergroupInfo[tokenId].numberOfFollowers = numberOfFollowers;
    }

    function burn(uint256 tokenId) external onlyGameContract {
        _burn(tokenId);
    }

    function getSupergroupInfo(
        uint256 tokenId
    ) public view returns (SupergroupInfo memory) {
        return _supergroupInfo[tokenId];
    }
}
