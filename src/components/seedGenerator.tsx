"use client";
import React, { useEffect, useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { WalletGenerator } from './walletGenerator';
import { MnemonicSeedContext } from '@/context/context';
import { MnemonicModal } from './MnemonicModal';
import { Spinner } from './Spinner';

export const SeedGenerator = ({ isSolana }: { isSolana: boolean }) => {
    const [mnemonic, setMnemonic] = useState<string>("");
    const [seed, setSeed] = useState<Buffer>(Buffer.alloc(0));
    const [isWalletGenerated, setIsWalletGenerated] = useState(false);
    const [isMnemonicModalOpen,setIsMnemonicModalOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    useEffect(() => {
        const storedMnemonic = localStorage.getItem('mnemonic');
        if (storedMnemonic) {
            setMnemonic(storedMnemonic);
            setSeed(mnemonicToSeedSync(storedMnemonic));
            setIsWalletGenerated(true);
        }
        setIsLoading(false)
    }, []);

    const generateWallet = () => {
        const newMnemonic = generateMnemonic();
        const newSeed = mnemonicToSeedSync(newMnemonic);
        
        setMnemonic(newMnemonic);
        setSeed(newSeed);
        setIsWalletGenerated(true);

        localStorage.setItem("mnemonic", newMnemonic);
        console.log("mnemonic is : " + newMnemonic);
    };

    return (
        <div>
            {isLoading?
                <div className='flex h-screen justify-center items-center'>
                    <Spinner />
                </div>
            :
            isWalletGenerated ? (
                <div>
                    <div className='flex md:justify-center mt-20 md:mr-20'>
                        <div className='text-white h-24 border border-gray-800 hover:bg-gray-800 hover:text-gray-200 text-4xl md:w-2/3 text-center pt-2 md:pt-6 rounded-lg hover:cursor-pointer' onClick={() => { setIsMnemonicModalOpen(true)}}>
                            Click here to see the mnemonic
                        </div>
                    </div>
                    <MnemonicSeedContext.Provider value={{ mnemonic, seed }}>
                        <WalletGenerator isSolana={isSolana} seed={seed} setSeed={setSeed} />
                    </MnemonicSeedContext.Provider>
                    {isMnemonicModalOpen?<MnemonicModal setIsMnemonicModalOpen={setIsMnemonicModalOpen} mnemonic={mnemonic.split(" ")}/>:null}
                </div>
            ) : (
                <div>
                    <div className='flex justify-center w-3/5 mt-20'>
                        <div className='text-white text-5xl font-extrabold ml-2 md:ml-0'>
                            Secret Recovery Phrase
                        </div>
                    </div>
                    <div className='flex justify-center 3'>
                        <div className='text-gray-400 text-xl font-semibold ml-2 md:ml-0 pr-2 mt-2'>
                            Warning: Copy and securely store your mnemonic phrase. If you lose it, you won’t be able to recover your wallet or access your funds!
                        </div>
                    </div>
                    <div className='flex md:justify-center md:w-2/6 ml-2 md:ml-20 mt-3 md:pl-4'>
                        <button title='import a wallet' className='bg-white h-12 w-20  rounded-md text-lg font-semibold md:ml-6 hover:bg-gray-800 hover:text-gray-200 '>
                            Import
                        </button>
                        <button title='generate a wallet' className='bg-white h-12 w-40  rounded-md text-lg ml-2 md:ml-6 font-semibold hover:bg-gray-800 hover:text-gray-200 ' onClick={generateWallet}>
                            Generate a wallet
                        </button>
                    </div>
                    
                </div>
            )
            }
        </div>
    );
}
