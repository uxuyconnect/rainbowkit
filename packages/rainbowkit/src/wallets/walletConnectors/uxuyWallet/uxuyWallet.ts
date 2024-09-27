import { isAndroid, isIOS } from '../../../utils/isMobile';
import type {
  DefaultWalletOptions,
  Wallet,
  WalletDetailsParams,
} from '../../Wallet';
//import {  hasInjectedProvider } from "../../getInjectedConnector";
//import { getWalletConnectConnector } from "../../getWalletConnectConnector";

import { type CreateConnectorFn, createConnector } from 'wagmi';
import { uxuyWallet as uxuyConnector } from 'wagmi/connectors';

export type UxuyWalletOptions = DefaultWalletOptions;

export const uxuyWallet = ({
  projectId,
  walletConnectParameters,
}: UxuyWalletOptions): Wallet => {
  // Not using the explicit isMetaMask fn to check for MetaMask
  // so that users can continue to use the MetaMask button
  // to interact with wallets compatible with window.ethereum.
  // The connector's getProvider will instead favor the real MetaMask
  // in window.providers scenarios with multiple wallets injected.
  //const isUxuyInjected = hasInjectedProvider({ flag: "isUxuy" });

  console.log(projectId);
  console.log(walletConnectParameters);
  const isUxuyInjected = true;

  const shouldUseWalletConnect = false;

  return {
    id: 'uxuy',
    name: 'UXUY Wallet',
    rdns: 'io.uxuy',
    iconUrl: async () => (await import('./uxuyWallet.svg')).default,
    iconAccent: '#f6851a',
    iconBackground: '#fff',
    installed: !shouldUseWalletConnect ? isUxuyInjected : undefined,
    downloadUrls: {
      android: 'https://download.uxuy.com/v0.1/uxuy-release.apk',
      ios: 'https://uxuy.com/download',
      mobile: 'https://uxuy.com/download',
      qrCode: 'https://uxuy.com/download',
      chrome: '',
      edge: '',
      firefox: '',
      opera: '',
      browserExtension: '',
    },

    mobile: {
      getUri: undefined,
    },
    qrCode: undefined,
    extension: {
      instructions: {
        learnMoreUrl: 'https://uxuy.com',
        steps: [],
      },
    },
    createConnector: (walletDetails: WalletDetailsParams) => {
      const connector: CreateConnectorFn = uxuyConnector({});

      return createConnector((config) => ({
        ...connector(config),
        ...walletDetails,
      }));
    },
  };
};
