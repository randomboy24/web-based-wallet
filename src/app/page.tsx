"use client"
import { SeedGenerator } from "@/components/seedGenerator";
import { WalletSelection } from "@/components/walletSelection"
import { useEffect, useState } from "react"

const Home = () => {
  const [isSolana,setIsSolana] = useState(false);
  const [isEthereum,setIsEthereum] = useState(false);
  const [mnemonicExists,setIsMnemonicExists] = useState(false)
  useEffect(() => {
    const mnemonic = localStorage.getItem('mnemonic');
    if((mnemonic==null?false:mnemonic.length>0)){
      setIsMnemonicExists(true)
    }
  },[])
  return (
    <>
      {((isSolana || isEthereum) || mnemonicExists)?
      <SeedGenerator isSolana={isSolana}/>:<WalletSelection setIsEthereum={setIsEthereum} setIsSolana={setIsSolana}/>}
    </>
  )
}

export default Home