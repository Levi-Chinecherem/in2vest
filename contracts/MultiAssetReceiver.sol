// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

interface IBridge {
    function transferToChain(
        address token, 
        address recipient, 
        uint256 amount, 
        uint256 targetChainId
    ) external;
}

contract MultiAssetReceiver is Ownable, ReentrancyGuard {
    constructor() Ownable(msg.sender) {
        // Additional initialization logic can go here
    }
    // Mapping to store whitelisted tokens, including stablecoins (USDT, USDC, DAI)
    mapping(address => bool) public supportedTokens;

    // Array to store list of whitelisted token addresses
    address[] public supportedTokenList;

    // Event for when ERC-20 tokens are received
    event ERC20Received(address indexed token, address indexed from, uint256 amount);
    
    // Event for when tokens are transferred cross-chain
    event CrossChainTransfer(
        address indexed token,
        address indexed from,
        address indexed recipient,
        uint256 amount,
        uint256 targetChainId
    );

    // Event for when supported tokens with non-zero balances are emitted
    event SupportedTokensWithBalances(address indexed tokenAddress, uint256 balance);

    // Function to whitelist ERC-20 tokens (including stablecoins like USDT, USDC, DAI)
    function whitelistToken(address token) external onlyOwner {
        require(!supportedTokens[token], "Token already whitelisted");
        supportedTokens[token] = true;
        supportedTokenList.push(token);  // Add token to the list
    }

    // Function to deposit ETH to the contract
    function depositETH() external payable {
        // Automatically receive ETH to the contract
    }

    // Allow contract to receive ETH directly
    receive() external payable {
        // Accept ETH deposits
    }

    // Function to receive ERC-20 tokens to the contract
    function depositERC20(address tokenAddress, uint256 amount) external nonReentrant {
        require(supportedTokens[tokenAddress], "Token not supported");
        
        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        // Emit event for token received
        emit ERC20Received(tokenAddress, msg.sender, amount);
    }

    // Function to bridge assets to another chain using the bridge contract
    function bridgeAssets(
        address bridgeContract, 
        address tokenAddress, 
        address recipient, 
        uint256 amount, 
        uint256 targetChainId
    ) external nonReentrant {
        require(supportedTokens[tokenAddress], "Token not supported");
        
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Insufficient token balance");

        IBridge bridge = IBridge(bridgeContract);
        require(token.transfer(bridgeContract, amount), "Bridge transfer failed");

        bridge.transferToChain(tokenAddress, recipient, amount, targetChainId);

        // Emit event for cross-chain transfer
        emit CrossChainTransfer(tokenAddress, msg.sender, recipient, amount, targetChainId);
    }

    // Get the contract's ETH balance
    function getETHBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Withdraw ETH from the contract (only by owner)
    function withdrawETH(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance in contract");
        payable(owner()).transfer(amount);
    }

    // Function to withdraw ERC-20 tokens from the contract (only by owner)
    function withdrawERC20(address tokenAddress, uint256 amount) external onlyOwner {
        require(supportedTokens[tokenAddress], "Token not supported");
        
        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(owner(), amount), "Transfer failed");
    }

    // Function to emit supported tokens with non-zero balances
    function emitSupportedTokensWithBalances() external {
        for (uint256 i = 0; i < supportedTokenList.length; i++) {
            address tokenAddress = supportedTokenList[i];
            uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
            if (balance > 0) {
                emit SupportedTokensWithBalances(tokenAddress, balance);
            }
        }
    }
}
