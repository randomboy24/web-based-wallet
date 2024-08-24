    import {  Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
    import { derivePath } from "ed25519-hd-key";
    import nacl from "tweetnacl";
    import { Wallet } from "./Wallet";
    import { N, Wallet as walletFromEthers } from "ethers";
    import { Keypair } from "@solana/web3.js";
    import bs58 from 'bs58';
    import { HDNodeWallet } from "ethers";
import { mnemonicToSeedSync } from "bip39";

    interface propTypes{
        isSolana:boolean,
        seed:Buffer,
        setSeed:Dispatch<SetStateAction<Buffer>>
    }

    interface walletTypes{
        path:string ,
        derivedSeed:Buffer 
        privateKey:string 
        publicKey:string 
        id:number 
    }

    export const WalletGenerator = ({isSolana,seed,setSeed}:propTypes) => {
        const [wallets,setWallets] = useState<walletTypes[]>([]);
        const [walletCount,setWalletCount] = useState(1)
        // const [path,setPath] = useState();

        useEffect(() => {
            const wallets = localStorage.getItem('wallets')?.toString();
            if(wallets){
                setWallets(JSON.parse(wallets))
            }
            const walletCount = localStorage.getItem('walletCount')?.toString();
            if(walletCount){
                setWalletCount(JSON.parse(walletCount));
                console.log(walletCount);
            }
            const mnemonic = localStorage.getItem('mnemonic');
            console.log("mnemonic : " +mnemonic)
            if((mnemonic==null?false:mnemonic.length>0)){
                // seed = mnemonicToSeedSync(mnemonic);
                setSeed(mnemonicToSeedSync(mnemonic as string))
            }
        },[])

        // useEffect()
    
        const path = useMemo(() => {
                        return `m/44'/${isSolana?'501':'60'}'/${walletCount}'/0'`
                    },[walletCount])
        

        return (
            <div>
                <div className="flex md:justify-center mt-10">
                    <div className="flex justify-between md:w-2/3">
                        <div className="text-4xl text-white font-bold">
                            {isSolana?"Solana Wallet":"Ethereum Wallet"}
                        </div>
                        <div className="flex">
                            <button className="bg-white text-black hover:bg-gray-800 hover:text-gray-200  h-12 w-40 mr-2 md:mr-4 rounded-lg" onClick={async () => {
                                // const {seed} = useContext(MnemonicSeedContext);
                                const derivedSeed = derivePath(path,seed.toString('hex')).key;
                                if(isSolana){
                                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                                const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
                                const privateKey = bs58.encode(secret);
                                setWallets(prevWallets => {
                                    const newWallets = [...prevWallets, {path, derivedSeed, privateKey, publicKey, id: walletCount}];
                                    localStorage.setItem('wallets', JSON.stringify(newWallets));
                                    return newWallets;
                                });
                                setWalletCount(prevCount => {
                                    const newCount = prevCount + 1;
                                    localStorage.setItem('walletCount', JSON.stringify(newCount));
                                    return newCount;
                                });
                                
                                }
                                else{
                                    const hdNode = HDNodeWallet.fromSeed(seed);
                                    const child = hdNode.derivePath(path);
                                    const privateKey = child.privateKey;
                                    const wallet = new walletFromEthers(privateKey);
                                    const publicKey = wallet.address;
                                    console.log(publicKey);
                                    setWallets(prevWallets => {
                                        const newWallets = [...prevWallets, {path, derivedSeed, privateKey, publicKey, id: walletCount}];
                                        localStorage.setItem('wallets', JSON.stringify(newWallets));
                                        return newWallets;
                                    });
                                    setWalletCount(prevCount => {
                                        const newCount = prevCount + 1;
                                        localStorage.setItem('walletCount', JSON.stringify(newCount));
                                        return newCount;
                                    });                                    
                                }
                            }}>
                                Add Wallet
                            </button>
                            <button className="bg-white text-black hover:bg-gray-800 hover:text-gray-200  h-12 w-40 mr-16 rounded-lg" onClick={() => {
                                setWallets([])
                                setWalletCount(1)
                                localStorage.removeItem('wallets');
                                localStorage.removeItem('walletCount');
                                localStorage.removeItem('mnemonic');
                                // window.location.reload();
                            }}>
                                Clear Wallets
                            </button>
                        </div>
                    </div>
                </div>
                {wallets.map(wallet => <Wallet key={wallet.id}publicKey={wallet.publicKey} privateKey={wallet.privateKey} walletCount={wallet.id} />)}
            </div>
        )
    }



