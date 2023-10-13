import { Signup } from './signup'
import { NFTItem, NFTItemSkeleton } from "@/components/nft-item"
import Marketplace from '../pages/marketplace'
import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { SOLANA_HOST } from '../utils/const'
import { getProgramInstance } from '../utils/utils'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import useAccount from '../hooks/useAccount'
import style from '../styles/MainView.module.css'

const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
}

const MainView = () => {
  const [isAccount, setAccount] = useState(false)
  const wallet = useWallet()
  const connection = new anchor.web3.Connection(SOLANA_HOST)
  const program = getProgramInstance(connection, wallet)
  const [description, setDescription] = useState('')
  const [userDetail, setUserDetail] = useState()

  const { signup } = useAccount()

  useEffect(() => {
    if (wallet.connected) {
      checkAccount()
      
    }
  }, [wallet.connected])

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Use effect2")
    }, 3000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
  })

  const checkAccount = async () => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('user'), wallet.publicKey.toBuffer()],
      program.programId,
    )

    try {
      const userInfo = await program.account.userAccount.fetch(user_pda)
      console.log(userInfo)
      setUserDetail(userInfo)
      setAccount(true)
    } catch (e) {
      setAccount(false)
    }
  }

  return (
    <>
      {isAccount ? (
        <div>
          <Marketplace />
        </div>
      ) : (
        <Signup signup={signup} wallet={wallet.publicKey.toBase58()} />
      )}
    </>
  )
}
export default MainView