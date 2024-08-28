import {  Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Wallet as walletFromEthers } from "ethers";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';
import { HDNodeWallet } from "ethers";
import { mnemonicToSeedSync } from "bip39";
import axios from 'axios';
import { Spinner } from "./Spinner";
import {Wallet } from "./Wallet";


interface propTypes{
    isSolana:boolean,
    seed:Buffer,
    setSeed:Dispatch<SetStateAction<Buffer>>
    setIsSolana:Dispatch<SetStateAction<boolean>>
}

export interface walletTypes{
    path:string
    derivedSeed:Buffer 
    privateKey:string 
    publicKey:string 
    id:number ,
    balance?:number
}

export const WalletGenerator = ({isSolana,seed,setSeed,setIsSolana}:propTypes) => {
    const [wallets,setWallets] = useState<walletTypes[]>([]);
    // const [walletCount,setWalletCount] = useState(0);
    const [clearWallet,setClearWallet] = useState(false)
    const [isloading,setIsLoading] = useState(false)

    useEffect(() => {
        // console.log(localStorage.getItem('wallets'))
        // if(typeof localStorage.getItem('wallets') !== 'string'){
        //     console.log(localStorage.getItem('wallets'))
        //     return;
        // }
        const wallets = localStorage.getItem('wallets')
        if(wallets){
            setWallets(JSON.parse(wallets))
        }
        const mnemonic = localStorage.getItem('mnemonic');
        if((mnemonic==null?false:mnemonic.length>0)){
            // seed = mnemonicToSeedSync(mnemonic);
            setSeed(mnemonicToSeedSync(mnemonic as string))
        }
        
        const hasRun = localStorage.getItem('hasRun');
        if (!hasRun || hasRun === 'false') {
            handleAddWallet();
            localStorage.setItem('hasRun', 'true');
        }

        // const   
    },[setSeed,isSolana])

    // useEffect()

    const path = useMemo(() => {
                    // console.log(`m/44'/${isSolana?'501':'60'}'/${wallets.length > 0? wallets[wallets.length - 1].id:wallets[wallets.length].id}'/0'`)
                    return `m/44'/${isSolana?'501':'60'}'/${wallets.length > 0? wallets.length ==1 ? 1: wallets[wallets.length - 1].id:0}'/0'`
    },[wallets,isSolana])
    

    async function handleAddWallet() {
        console.log("i")
        if(isloading){
            return;
        }
        setIsLoading(true)
        // const {seed} = useContext(MnemonicSeedContext);
        const derivedSeed = derivePath(path,seed.toString('hex')).key;
        if(isSolana){
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
        const privateKey = bs58.encode(secret);
        const response =  await axios.post("https://solana-mainnet.g.alchemy.com/v2/b46SxpAAom-FUEOAVdGUuii9VYguZVrv",{
                jsonrpc: "2.0",
                id: 1,
                method: "getBalance",
                params: [publicKey]
        });

        const balance:number = response.data.result.value;
        setWallets(prevWallets => {
            const newWallets = [...prevWallets, {path, derivedSeed, privateKey, publicKey, id: prevWallets.length > 0? prevWallets[prevWallets.length -1].id+1 :0,balance}];
            localStorage.setItem('wallets', JSON.stringify(newWallets));
            return newWallets;
        });
        
        }
        else{
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(path);
            const privateKey = child.privateKey;
            const wallet = new walletFromEthers(privateKey);
            const publicKey = wallet.address;
            
            const response = await axios.post("https://eth-mainnet.g.alchemy.com/v2/b46SxpAAom-FUEOAVdGUuii9VYguZVrv",{  
                    jsonrpc: "2.0",
                    id: 1,
                    method: "eth_getBalance",
                    params: [publicKey, "latest"]
            })

            const balance:number = (parseInt(response.data.result,16))/Math.pow(10,18);

            setWallets(prevWallets => {
                const newWallets = [...prevWallets, {path, derivedSeed, privateKey, publicKey, id: prevWallets.length > 0? prevWallets[prevWallets.length -1].id+1 :0,balance}];
                localStorage.setItem('wallets', JSON.stringify(newWallets));
                return newWallets;
            });  
        }   
        setIsLoading(false)                                 
    }

    return (
        <div className="">
            {clearWallet?<div className="fixed inset-0 z-50 backdrop-blur-sm flex flex-col justify-center items-center text-white w-screen">
               <div className="flex flex-col md:w-[30%] bg-gray-950 border border-gray-700 rounded-lg w-[80%] ">
                <div className="text-xl mt-8 ml-3">
                    Are you sure you want to delete all the wallets ? 
                </div>
                <div className="text-gray-600 mt-3 ml-3">
                    This action cant be undone.This will permanently delete your Wallets and Key from the localstorage.
                </div>
                <div className="flex justify-end mt-12 mb-4">
                    <button className="bg-gray-200 rounded-md w-20 h-9 text-black mr-3 transform transition-transform duration-300 hover:scale-105" onClick={() => {
                        setClearWallet(false)
                    }}>cancel</button>
                    <button className="bg-red-900 rounded-md w-20 h-9 mr-3 transform transition-transform duration-300 hover:scale-105" onClick={() => {
                        setWallets([])
                        // setWalletCount(1)
                        localStorage.removeItem('wallets');
                        localStorage.removeItem('walletCount');
                        localStorage.removeItem('mnemonic');
                        localStorage.removeItem('isSolana');
                        localStorage.removeItem('hasRun');
                        setClearWallet(false)
                        window.location.reload();
                    }}>Delete</button>
                </div>
               </div>
            </div>:null}
            <div className="flex justify-center mt-16">
                <div className="flex justify-between md:w-2/3 md:mr-5 w-[96%] ">
                    <div className="text-4xl text-white font-bold">
                        {isSolana?"Solana Wallet":"Ethereum Wallet"}
                    </div>
                    <div className="flex ml-16 mt-2 md:mt-0 md:ml-0">
                        

                        <button className="bg-white text-black hover:bg-gray-800 hover:text-gray-200  h-10 w-28 md:h-12 md:w-40 mr-2 md:mr-4 rounded-lg transform transition-transform duration-300 hover:scale-105" onClick={handleAddWallet}>
                            Add Wallet
                        </button>
                        <button className="bg-white text-black hover:bg-gray-800 hover:text-gray-200  h-10 w-28 md:h-12 md:w-40 mr-16 rounded-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {
                           setClearWallet(true);;
                        }}>
                            Clear Wallets
                        </button>
                    </div>
                </div>
            </div>{
                isloading ?<div className="flex h-screen items-center justify-center "> <Spinner/> </div>:
                wallets.map(wallet => wallet.id>=0?<Wallet key={wallet.id}wallet={wallet} isSolana={isSolana} setWallets={setWallets}/>:null)
            }
        </div>
    )
}



