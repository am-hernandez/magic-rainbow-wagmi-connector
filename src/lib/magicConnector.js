import { dedicatedWalletConnector } from '@magiclabs/wagmi-connector';
import { createConnector as createWagmiConnector } from 'wagmi';

export const getRainbowMagicWallet = (
  options
) => {
  return () => rainbowMagicWallet(options);
};

export const rainbowMagicWallet = ({
  chains,
  apiKey,
}) => ({
  id: 'magic',
  name: 'Magic',
  rdns: 'Magic',
  iconUrl: 'https://media.licdn.com/dms/image/v2/D4E0BAQGorzUgKSt_lw/company-logo_200_200/company-logo_200_200/0/1719257630816/magiclabs_inc_logo?e=1733961600&v=beta&t=f_KnNL86G_YM89WCulQzQ2KsqpLoy6SLa6U_SaCHCFo',
  iconBackground: '#6851FF',
  installed: true,
  downloadUrls: {},
  createConnector: (walletDetails) =>
    createWagmiConnector(config => ({
      ...dedicatedWalletConnector({
        chains: chains,
        options: {
          apiKey,
          magicSdkConfiguration: {
            network: {
              rpcUrl: import.meta.env.VITE_RPC_URL,
              chainId: 11155111,
            },
          },
          //...Other options (check out full API below)
        },
      })(config),
      ...walletDetails,
    })),
});

