import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { sepolia } from '@wagmi/core/chains'
import Dashboard from "./components/Dashboard";
import { RainbowKitProvider, connectorsForWallets } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';
import { getRainbowMagicWallet } from "./lib/magicConnector";
import {
  // coinbaseWallet,
  // metaMaskWallet,
  // rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { http } from "viem";

const queryClient = new QueryClient();
const chains = [{
  "id": 11155111,
  "name": "Sepolia",
  "nativeCurrency": {
      "name": "Sepolia Ether",
      "symbol": "ETH",
      "decimals": 18
  },
  "rpcUrls": {
      "default": {
          "http": [
              "https://rpc.sepolia.org"
          ]
      }
  },
  "blockExplorers": {
      "default": {
          "name": "Etherscan",
          "url": "https://sepolia.etherscan.io",
          "apiUrl": "https://api-sepolia.etherscan.io/api"
      }
  },
  "contracts": {
      "multicall3": {
          "address": "0xca11bde05977b3631167028862be2a173976ca11",
          "blockCreated": 751532
      },
      "ensRegistry": {
          "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
      },
      "ensUniversalResolver": {
          "address": "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
          "blockCreated": 5317080
      }
  },
  "testnet": true
}];


const magicWallet = getRainbowMagicWallet({
  chains, apiKey: import.meta.env.VITE_MAGIC_API_KEY
});

let connectors;

try {
  const walletOptions = {
    appName: 'Connector App',
    projectId: import.meta.env.VITE_WALLET_CONNECT_V2_PROJECT_ID,
    // walletConnectParameters: {
    //   rpc: {
    //     11155111: "https://rpc.sepolia.org"
    //   }
    // },
    appDescription: 'Connector App Description',
    // appUrl: 'https://myapp.com',
  };

  connectors = connectorsForWallets(
    [
      {
        groupName: 'Recommended',
        wallets: [
          // coinbaseWallet,
          // metaMaskWallet,
          // walletConnectWallet({chains, ...walletOptions}),
          magicWallet
        ]
      }
    ],
    // {
    //   appName: 'Connector App',
    //   projectId: import.meta.env.VITE_WALLET_CONNECT_V2_PROJECT_ID,
    // }
    walletOptions
  );
} catch (error) {
  console.log('Error getting connectors');
  console.error(error);     
}

const config = createConfig({
  autoConnect: false,
  connectors,
  chains,
  transports: {
    [11155111]: http(),
  },
});


function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider >
          <Dashboard />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;