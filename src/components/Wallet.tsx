import React, { Dispatch, SetStateAction, useState } from 'react';
import {TransactionModal} from './TransactionModal';
import {  EyeIcon } from 'lucide-react';
import { EyeOffIcon } from 'lucide-react';
import { walletTypes } from './walletGenerator';
import Image from 'next/image';


interface propTypes {
    wallet:walletTypes
    setWallets:Dispatch<SetStateAction<walletTypes[]>>
    isSolana:boolean,
}


export const Wallet = ({ wallet,isSolana,setWallets}: propTypes ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isTransactionModalOpen,setIsTransactionModalOpen] = useState(false)
    const [isPrivKeyShown,setisPrivKeyShown] = useState(false)
    const [isWalletDeleteModalOpen,setIsDeleteModalOpen] = useState(false)


    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };
    // console.log(isSolana)
    // console.log(wallet.publicKey)
    return (
        <div className='flex justify-center '>
            <div className="md:w-[64%]  w-screen mt-10 ">
                {
                    isWalletDeleteModalOpen? 
                    <div className='fixed inset-0 backdrop-blur-sm flex z-50 flex-col justify-center items-center text-white'>
                        <div className='flex flex-col border border-[#222] rounded-lg  bg-[#111] md:w-[30%] w-screen '>
                            <div className='text-xl mx-5 my-3 mt-7 font-semibold'>
                                Are you sure you want to delete all wallets?
                            </div>
                            <div className='text-gray-400 mx-5'>
                                This action cannot be undone.This will permanently delete your wallet and keys from local storage.
                            </div>
                            <div className='flex justify-end mx-5 mb-6 my-4'>
                                <button className='border border-gray-700 bg-[#000] rounded-md w-20 h-9 mx-2 text-lg hover:bg-gray-800 transform transition-transform duration-300 hover:scale-105'
                                onClick={() => {
                                    setIsDeleteModalOpen(false)
                                    
                                }}
                                >Cancel</button>
                                <button className='border border-gray-700 bg-red-800 rounded-md w-20 h-9 mx-2 text-lg hover:bg-red-950 transform transition-transform duration-300 hover:scale-105'
                                onClick={() => {
                                    setWallets(((prevWallets) => {
                                        const newWallets = prevWallets.filter((w) => w.id !== wallet.id)
                                        const storedWallets= localStorage.getItem('wallets');
                                        const walletsArray = storedWallets? JSON.parse(storedWallets): [];
                                        const walletsAfterDel = walletsArray.filter((w:any) => w.id !== wallet.id)
                                        localStorage.removeItem('wallets');
                                        localStorage.setItem("wallets",JSON.stringify(walletsAfterDel))
                                        return newWallets;
                                    }))
                                    setIsDeleteModalOpen(false)
                                }}
                                >Delete</button>
                            </div>
                        </div>
                    </div>:
                    null
                }
                <h2>
                    <button
                        type="button"
                        onClick={toggleAccordion}
                        aria-expanded={isOpen}
                        className={`flex items-center justify-between w-full p-5 font-medium text-gray-500 border ${isOpen?"border-b-0":""}border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
                    >
                        <span className="flex items-center text-xl  font-semibold">
                            {/* Replace this with your icon */}
                            {isSolana?<Image className="w-8 mr-2" width={10} height={10} src="/solana-sol-logo.svg" alt="solana icon"/>:<Image className="w-8 h-10 mr-2" width={10} height={10} src="/ethereum-eth-logo.svg" alt="ethereum icon"/>}
                            {`Wallet ${wallet.id +1}`}
                        </span>
                        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                        </svg>
                    </button>
                </h2>
                <div
                    className={`p-5 border ${isOpen?"border-t-0":""} border-gray-200 dark:border-gray-700 ${isOpen ? '' : 'hidden'}`}
                    aria-labelledby="accordion-heading"
                >
                    <div className="mb-2  border-b border-gray-500">
                        <h3 className="font-medium text-white">Public Key</h3> 
                        <div className='flex justify-between'>
                        <p className=' mt-2 text-gray-500 hidden md:block'>{wallet.publicKey}</p>
                        <p className=' mt-2 text-gray-500 block md:hidden'>{wallet.publicKey.substring(0,30)}.....</p>
                        <Image className='hover:cursor-pointer mb-2' width={30} height={30} src="/delete.svg" alt="delete icon" onClick={() => {
                            setIsDeleteModalOpen(true)
                        }}/>
                        </div>
                    </div>
                    <div className='border-b border-gray-500 text-white mt-2'>
                        <h3 className="font-medium text-white">Private Key</h3>
                        {isPrivKeyShown?
                        <div className='flex justify-between mt-2'>
                            <p className=' pb-2  text-gray-500 hidden 2xl:block'>{wallet.privateKey}</p>
                            <p className=' pb-2  text-gray-500 md:block hidden 2xl:hidden'>{wallet.privateKey.substring(0,42)}.....</p>
                            <p className=' pb-2  text-gray-500 block md:hidden'>{wallet.privateKey.substring(0,33)}.....</p>
                            <EyeOffIcon className='hover:cursor-pointer h-8 text-gray-200' onClick={() => setisPrivKeyShown(!isPrivKeyShown)}/>
                        </div>:
                        <div className='flex justify-between flex-wrap'>
                            <p className='text-white md:text-xl pb-2 hidden xl:block'>.............................................................................................................</p>
                            <p className='text-white md:text-xl pb-2 block xl:hidden'>....................................................................</p>
                            <EyeIcon className='hover:cursor-pointer h-8 mt-2 text-gray-200' onClick={() => setisPrivKeyShown(!isPrivKeyShown)}/>
                        </div>}
                    </div>
                    <div className='text-white flex justify-between'>
                        <div className='mt-3'> 
                            <span>{isSolana?"Sol :":"Eth : "}</span>
                            <span> {wallet.balance}</span>
                        </div>
                        <button
                            className="flex items-center bg-blue-600 mr-2   mt-2 gap-1 px-4 py-2 cursor-pointer text-gray-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                            // onClick={() => {setIsTransactionModalOpen(true)}}
                            >
                            Send
                            <svg
                                className="w-5 h-5"
                                stroke="currentColor"
                                stroke-width="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                ></path>
                            </svg>
                            </button>
                            {/* {isTransactionModalOpen?<TransactionModal  isSolana={isSolana} pubKey={wallet.publicKey} privKey={wallet.privateKey}/>:null} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

