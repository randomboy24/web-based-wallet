import { useContext, useMemo, useState } from "react"
import { Wallet } from "./Wallet"
import { MnemonicSeedContext } from "@/context/context";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { createSecretKey } from "crypto";
import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58';

interface propTypes{
    isSolana:boolean,
    seed:Buffer
}

interface walletTypes{
    path:string,
    derivedSeed:Buffer,
    privateKey:string,
    publicKey:string,
    id:number 
}

export const WalletGenerator = ({isSolana,seed}:propTypes) => {
    const [wallets,setWallets] = useState<walletTypes[]>([]);
    const [walletCount,setWalletCount] = useState(1)
    // const [path,setPath] = useState();
   
    const path = useMemo(() => {
                    return `m/44'/${isSolana?'501':'60'}'/${walletCount}'/0'`
                },[walletCount])

    return (
        <div>
            <div className="flex justify-center mt-10">
                <div className="flex justify-between w-2/3">
                    <div className="text-4xl text-white font-bold">
                        {isSolana?"Solanan Waller":"Ethereum Wallet"}
                    </div>
                    <div className="flex">
                        <button className="bg-gray-500 text-gray-900 h-12 w-40 mr-4 rounded-lg" onClick={() => {
                            // const {seed} = useContext(MnemonicSeedContext);
                            const derivedSeed = derivePath(path,seed.toString('hex')).key;
                            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                            const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
                            const privateKey = bs58.encode(secret);
                            setWallets([...wallets,{path,derivedSeed,privateKey,publicKey,id:walletCount}])
                            setWalletCount(walletCount => {return walletCount+1})
                            console.log(walletCount)
                        }}>
                            Add Wallet
                        </button>
                        <button className="bg-gray-500 text-gray-900 h-12 w-40 mr-16 rounded-lg">
                            Clear Wallets
                        </button>
                    </div>
                </div>
            </div>
            {wallets.map(wallet => <Wallet key={wallet.id}publicKey={wallet.publicKey} privateKey={wallet.privateKey} walletCount={wallet.id} />)}
        </div>
    )
}



