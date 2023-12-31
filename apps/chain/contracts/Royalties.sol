// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Royalties is ERC20, Ownable {
    address private _gameContract;

    modifier onlyGameContract() {
        require(msg.sender == _gameContract);
        _;
    }

    constructor(
        address gameContract
    ) ERC20("Royalties", "RLTS") Ownable(msg.sender) {
        _gameContract = gameContract;
    }

    function mint(address to, uint256 amount) public onlyGameContract {
        _mint(to, amount);
    }
}
