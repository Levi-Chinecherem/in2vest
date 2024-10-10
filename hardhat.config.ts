import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

// You can get your Infura API key and private key from MetaMask or any Ethereum wallet
const INFURA_API_KEY = "YOUR_INFURA_API_KEY";
const PRIVATE_KEY = "YOUR_WALLET_PRIVATE_KEY";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};

export default config;
