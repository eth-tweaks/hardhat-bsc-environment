// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockToken is ERC20 {

    constructor(string memory name_, string memory symbol_, uint256 initSupply) ERC20(name_, symbol_) {
        _mint(msg.sender, initSupply);
    }
}