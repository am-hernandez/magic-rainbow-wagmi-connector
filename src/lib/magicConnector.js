import { dedicatedWalletConnector } from '@magiclabs/wagmi-connector';
import { createConnector as createWagmiConnector } from 'wagmi';

export const getRainbowMagicWallet = (
  options
) => {
  return () => rainbowMagicWallet(options);
};

export const rainbowMagicWallet = ({ chains, apiKey }) => ({
  id: "magic",
  name: "Magic",
  rdns: "Magic",
  iconUrl: "/magiclogo.jpg",
  iconBackground: "/magiclogo.jpg",
  installed: true,
  downloadUrls: {},
  createConnector: (walletDetails) =>
    createWagmiConnector(config => ({
      ...dedicatedWalletConnector({
        chains: chains,
        options: {
          apiKey,
          // UI Customization
          accentColor: "#6851FF",
          isDarkMode: true,
          customLogo: "/magiclogo.jpg",
          // Authentication Options
          enableEmailLogin: true,
          enableSMSLogin: true,
          // Configuration
          magicSdkConfiguration: {
            network: {
              rpcUrl: import.meta.env.VITE_RPC_URL,
              chainId: 84532,
            },
            
          },
        },
      })(config),
      ...walletDetails,
    })),
});
