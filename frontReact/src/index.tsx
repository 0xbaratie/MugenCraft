import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Chain, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import { NodeTypesProvider } from './views/Nodes/NodeTypesContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const blast: Chain = {
  id: 168_587_773,
  name: 'Blast Sepolia',
  network: 'blast-sepolia',
  iconUrl: `https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65a6c39bae6093c6653dd016_Logo%20Yellow%20on%20Black%20Background%202x-p-500.png`,
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.blast.io'] },
    default: { http: ['https://sepolia.blast.io'] },
  },
  blockExplorers: {
    default: { name: 'BlastScan', url: 'https://testnet.blastscan.io' },
  },
  testnet: true,
};
const { chains, publicClient } = configureChains([blast], [publicProvider()]);
const { connectors } = getDefaultWallets({
  appName: 'Mugen Craft',
  projectId: '517f7cb35d53d6d6b5727d01e02c66a7',
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <NodeTypesProvider>
        <RainbowKitProvider chains={chains}>
          <App />
        </RainbowKitProvider>
      </NodeTypesProvider>
    </WagmiConfig>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
