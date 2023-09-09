import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { ThirdwebProvider, ChainId, paperWallet, metamaskWallet, localWallet } from '@thirdweb-dev/react';
import ReactDOM from 'react-dom/client'
import { GlobalStateProvider } from './context/';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider 
      clientId='7a70c7a8565b84970c73e45066a64a14'
      activeChain={ ChainId.Mumbai }  
      supportedWallets={[
        paperWallet({
          paperClientId: "6336b3a8-256d-4aec-b987-45a4e1eb5c3a"
        }),
        localWallet(),
        metamaskWallet()
      ]}
      sdkOptions={{
        gasless: {
            openzeppelin: {
                relayerUrl: 'https://api.defender.openzeppelin.com/autotasks/b5e79638-b5aa-4d77-8964-72feec11e28d/runs/webhook/b496ed3a-bec5-4724-bdd3-8ab35c38ce5d/SEovrsRgnrYmADC8FU8hjJ'
            }
        }}
    }
    >
      <GlobalStateProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GlobalStateProvider>
    </ThirdwebProvider>
  </React.StrictMode>
)