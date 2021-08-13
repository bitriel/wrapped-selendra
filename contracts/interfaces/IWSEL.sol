// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

/// @title Interface for WSEL
interface IWSEL is IERC20 {
    /// @notice Deposit selendra to get wrapped selendra
    function deposit() external payable;

    /// @notice Withdraw wrapped selendra to get selendra
    function withdraw(uint) external;

    event Deposit(address indexed to, uint amount);
    event Withdrawal(address indexed from, uint amount);
}