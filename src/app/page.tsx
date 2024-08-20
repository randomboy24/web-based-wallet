"use client"
import { WalletGenerator } from "@/components/WalletGenerator";
import { WalletSelection } from "@/components/walletSelection"
import { useState } from "react"

const Home = () => {
  const [isSolana,setIsSolana] = useState(false);
  const [isEthereum,setIsEthereum] = useState(false);
  return (
    <>
      {isSolana || isEthereum?
      <WalletGenerator />:<WalletSelection setIsEthereum={setIsEthereum} setIsSolana={setIsSolana}/>}
    </>
  )
}

export default Home