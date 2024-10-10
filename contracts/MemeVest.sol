// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeVest is ERC20, Ownable {
    uint256 private constant _initialSupply = 1_000_000_000 * 10 ** 18; // 1 billion tokens

    constructor() ERC20("MemeVest", "MVST") {
        _mint(msg.sender, _initialSupply);
    }

    // Allow the owner to mint new tokens
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    // Allow the owner to burn tokens
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }

    // Airdrop function to distribute tokens to multiple addresses
    function airdrop(address[] calldata recipients, uint256 amount) external onlyOwner {
        require(recipients.length > 0, "No recipients provided");
        require(amount > 0, "Amount must be greater than 0");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            _transfer(msg.sender, recipients[i], amount);
        }
    }
}
