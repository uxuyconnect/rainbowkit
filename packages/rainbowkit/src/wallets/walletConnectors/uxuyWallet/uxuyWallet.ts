import { isAndroid, isIOS } from "../../../utils/isMobile";
import { DefaultWalletOptions, Wallet, WalletDetailsParams } from "../../Wallet";
//import {  hasInjectedProvider } from "../../getInjectedConnector";
//import { getWalletConnectConnector } from "../../getWalletConnectConnector";

import { type CreateConnectorFn, createConnector } from "wagmi";
import { uxuyWallet as uxuyConnector } from "wagmi/connectors";

export type UxuyWalletOptions = DefaultWalletOptions;

export const uxuyWallet = ({ projectId, walletConnectParameters }: UxuyWalletOptions): Wallet => {
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

  const getUri = (uri: string) => {
    return isAndroid()
      ? uri
      : isIOS()
        ? // currently broken in MetaMask v6.5.0 https://github.com/MetaMask/metamask-mobile/issues/6457
          `metamask://wc?uri=${encodeURIComponent(uri)}`
        : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
  };

  return {
    id: "uxuy",
    name: "uxuy",
    rdns: "io.uxuy",
    iconUrl: async () => (await import("./uxuyWallet.svg")).default,
    iconAccent: "#f6851a",
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isUxuyInjected : undefined,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202",
      mobile: "https://metamask.io/download",
      qrCode: "https://metamask.io/download",
      chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
      firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
      opera: "https://addons.opera.com/extensions/details/metamask-10",
      browserExtension: "https://metamask.io/download",
    },

    mobile: {
      getUri: shouldUseWalletConnect ? getUri : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [
              {
                description: "wallet_connectors.metamask.qr_code.step1.description",
                step: "install",
                title: "wallet_connectors.metamask.qr_code.step1.title",
              },
              {
                description: "wallet_connectors.metamask.qr_code.step2.description",
                step: "create",
                title: "wallet_connectors.metamask.qr_code.step2.title",
              },
              {
                description: "wallet_connectors.metamask.qr_code.step3.description",
                step: "refresh",
                title: "wallet_connectors.metamask.qr_code.step3.title",
              },
            ],
          },
        }
      : undefined,
    extension: {
      instructions: {
        learnMoreUrl: "https://metamask.io/faqs/",
        steps: [
          {
            description: "wallet_connectors.metamask.extension.step1.description",
            step: "install",
            title: "wallet_connectors.metamask.extension.step1.title",
          },
          {
            description: "wallet_connectors.metamask.extension.step2.description",
            step: "create",
            title: "wallet_connectors.metamask.extension.step2.title",
          },
          {
            description: "wallet_connectors.metamask.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.metamask.extension.step3.title",
          },
        ],
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
