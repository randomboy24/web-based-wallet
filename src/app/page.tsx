"use client"
import { SeedGenerator } from "@/components/seedGenerator";
import { Spinner } from "@/components/Spinner";
import { WalletSelection } from "@/components/walletSelection"
import { setupFsCheck } from "next/dist/server/lib/router-utils/filesystem";
import { useEffect, useState } from "react"

const Home = () => {
  const [isSolana,setIsSolana] = useState(false);
  const [isEthereum,setIsEthereum] = useState(false);
  const [mnemonicExists,setIsMnemonicExists] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    const mnemonic = localStorage.getItem('mnemonic');
    if((mnemonic==null?false:mnemonic.length>0)){
      setIsMnemonicExists(true)
    }
    setIsLoading(false)
  },[])
  return (
    <>{isLoading?<div className="flex h-screen items-center justify-center "> <Spinner /> </div>:
      ((isSolana || isEthereum) || mnemonicExists)?
        <SeedGenerator isSolana={isSolana}/>:<WalletSelection setIsEthereum={setIsEthereum} setIsSolana={setIsSolana}/>
    }
     
    </>
  )
}

export default Home