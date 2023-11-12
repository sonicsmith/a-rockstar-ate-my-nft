// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SuperGroups is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    address private _gameContract;

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

    function safeMint(address to) public onlyGameContract {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyGameContract {
        _burn(tokenId);
    }
}
