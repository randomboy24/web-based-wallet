"use client"
import { SeedGenerator } from "@/components/seedGenerator";
import { WalletSelection } from "@/components/walletSelection"
import { MnemonicSeedContext } from "@/context/context";
import { useEffect, useState } from "react"

const Home = () => {
  const [isSolana,setIsSolana] = useState(false);
  const [isEthereum,setIsEthereum] = useState(false);
  const [mnemonicExists,setIsMnemonicExists] = useState(false)
  useEffect(() => {
    const mnemonic = localStorage.getItem('mnemonic');
    console.log(mnemonic)
    if((mnemonic==null?false:mnemonic.length>0)){
      setIsMnemonicExists(true)
    }
    console.log(mnemonic)
    console.log(mnemonicExists)
  },[])
  return (
    <>
      {((isSolana || isEthereum) || mnemonicExists)?
      <SeedGenerator isSolana={isSolana}/>:<WalletSelection setIsEthereum={setIsEthereum} setIsSolana={setIsSolana}/>}
    </>
  )
}

export default Home