"use client"
import { SeedGenerator } from "@/components/seedGenerator";
import { WalletSelection } from "@/components/walletSelection"
import { useState } from "react"

const Home = () => {
  const [isSolana,setIsSolana] = useState(false);
  const [isEthereum,setIsEthereum] = useState(false);
  return (
    <>
      {isSolana || isEthereum?
      <SeedGenerator isSolana={isSolana}/>:<WalletSelection setIsEthereum={setIsEthereum} setIsSolana={setIsSolana}/>}
    </>
  )
}

export default Home