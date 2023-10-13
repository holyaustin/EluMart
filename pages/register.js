import { useWallet } from '@solana/wallet-adapter-react'
import MainView from '../components/mainview'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
//import ConnectWalletButton from "../components/connect-wallet-button"

export default function Home() {
  const { connected } = useWallet()

  return (
    <div className='app'>
      {connected ? (
        <MainView />
      ) : (
        <div className='loginContainer'>
          <div className='loginTitle'>Log in to EluMart</div>
          <div className='loginSubTitle'>
            Make sure to connect your wallet to Signup or Login to access Marketplace
          </div>
          {/**<WalletMultiButton  /> */}

        </div>
      )}
    </div>
  )
}