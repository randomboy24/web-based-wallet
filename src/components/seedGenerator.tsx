"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39';
import { WalletGenerator } from './walletGenerator';
import { MnemonicModal } from './MnemonicModal';
import { Spinner } from './Spinner';
import {  X } from 'lucide-react';

interface propTypes{
    isSolana : boolean,
    setIsSolana:Dispatch<SetStateAction<boolean>>
}

export const SeedGenerator = ({ isSolana ,setIsSolana}: propTypes) => {
    const [mnemonic, setMnemonic] = useState<string>("");
    const [seed, setSeed] = useState<Buffer>(Buffer.alloc(0));
    const [isWalletGenerated, setIsWalletGenerated] = useState(false);
    const [isMnemonicModalOpen,setIsMnemonicModalOpen] = useState(false)
    const [isLoading,setIsLoading] = useState(true)
    const [isImportingMnemonic,setIsImportingMnemonic] = useState(false)
    const [importMnemonic,setImportMnemonic] = useState<string[]>(Array(12).fill(""))

    useEffect(() => {
        const storedMnemonic = localStorage.getItem('mnemonic');
        if (storedMnemonic) {
            setMnemonic(storedMnemonic);
            setSeed(mnemonicToSeedSync(storedMnemonic));
            setIsWalletGenerated(true);
        }
        setIsLoading(false)
        if(localStorage.getItem('isSolana') == "true"){
            setIsSolana(true)
        }
    }, [setIsSolana]);

    const generateWallet = () => {
        const newMnemonic = generateMnemonic();
        const newSeed = mnemonicToSeedSync(newMnemonic);
        
        setMnemonic(newMnemonic);
        setSeed(newSeed);
        setIsWalletGenerated(true);

        localStorage.setItem("mnemonic", newMnemonic);
        // console.log("mnemonic is : " + newMnemonic+"\n" + typeof(mnemonic));
    };


    return (
        <div>
            {isImportingMnemonic?
            <div className='fixed inset-0 backdrop-blur-sm z-50 flex flex-col justify-center items-center text-white   '>
                <div className='flex flex-col border-2 border-gray-800 bg-[#222] w-[420px] items-center rounded-xl '>
                    <div className=' mt-5  text-white text-2xl text-center'>
                        Secret Recovery Phase
                    </div>
                    <div className=' my-2 text-gray-500 text-lg  text-center'>
                        Import an existing wallet with your 12 word secret recovery phase.
                    </div>
                    <div className=' my-4 grid grid-cols-3 grid-rows-4'>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='1'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[0] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='2'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[1] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='3'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[2] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='4'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[3] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='5'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[4] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='6'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[5] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='7'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[6] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='8'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[7] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='9'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[8] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='10'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[9] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='11'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[10] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                        <input className='mx-3 my-2 pl-1 bg-[#111111] border border-gray-800 w-24 h-10 rounded-lg' placeholder='12'onChange={(e) => {
                            setImportMnemonic((prevValue) => {
                                const newValue = [...prevValue];
                                newValue[11] = e.target.value; // Assuming you're updating the first word in the mnemonic
                                return newValue;
                            })
                        }}></input>
                    </div>
                    <button className='w-[95%] h-12 mt-4 rounded-lg bg-[#333] transform transition-transform duration-300 hover:scale-105' onClick={() => {

                        if(!(validateMnemonic(importMnemonic.join(' ').toString()))){
                            // console.log(importMnemonic)
                            alert("invalid mnemonic")
                            return;
                        }
                        const newSeed = mnemonicToSeedSync(importMnemonic.join(' ').toString());
                        setSeed(newSeed);
                        setIsWalletGenerated(true);

                        localStorage.setItem("mnemonic", importMnemonic.join(" ").toString());
                        setMnemonic(importMnemonic.join(" ").toString())
                        setIsImportingMnemonic(false)
                        
                    }}>Import a Wallet</button>
                    <X className='text-gray-300 bg-red-900 relative bottom-[442px] left-[190px] rounded-sm hover:cursor-pointer' onClick={() => setIsImportingMnemonic(false)}/>
                </div>
            </div>
            :null}
            {isLoading?
                <div className='flex h-screen justify-center items-center'>
                    <Spinner />
                </div>
            :
            isWalletGenerated ? (
                <div>
                    <div className='flex md:justify-center mt-20 md:mr-20'>
                        <div className='text-white h-24 border border-gray-800 hover:bg-gray-800 hover:text-gray-200 text-4xl md:w-2/3 text-center pt-2 md:pt-6 rounded-lg hover:cursor-pointer transform transition-transform duration-300 hover:scale-105' onClick={() => { setIsMnemonicModalOpen(true)}}>
                            Click here to see the mnemonic
                        </div>
                    </div>
                   
                        <WalletGenerator isSolana={isSolana} seed={seed} setSeed={setSeed} setIsSolana={setIsSolana}/>
                    
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
                        <button title='import a wallet' className='bg-white h-12 w-20  rounded-md text-lg font-semibold md:ml-6 hover:bg-gray-800 hover:text-gray-200 transform transition-transform duration-300 hover:scale-105'
                        onClick={() => {
                            setIsImportingMnemonic(true)
                        }}>
                            Import
                        </button>
                        <button title='generate a wallet' className='bg-white h-12 w-40  rounded-md text-lg ml-2 md:ml-6 font-semibold hover:bg-gray-800 hover:text-gray-200 transform transition-transform duration-300 hover:scale-105' onClick={generateWallet}>
                            Generate a wallet
                        </button>
                    </div>
                    
                </div>
            )
            }
        </div>
    );
}
