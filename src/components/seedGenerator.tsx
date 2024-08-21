"use client"
import React, { useState } from 'react'
import nacl from 'tweetnacl';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import { cookies } from 'next/headers';
import { WalletGenerator } from './walletGenerator';


export const SeedGenerator = ({isSolana}:{isSolana:boolean}) => {
    const [mnemonic,setMnemonic] = useState("");
    const seed = mnemonicToSeedSync(mnemonic);
    const [isWalletGenerated,setIsWalletGenerated] = useState(false);

  return (
    <div>
        {isWalletGenerated?
        <div>
            <div className='flex justify-center mt-20  mr-20'>
                <div className='text-white h-24 border border-gray-800 text-4xl w-2/3  text-center pt-6 rounded-lg hover:cursor-pointer'>
                    Click here to see the see the mnemonic
                </div>
            </div>
            <WalletGenerator isSolana={isSolana} mnemonic={mnemonic}/>
        </div>
        :
        <div>
            <div className='flex justify-center w-3/5 mt-20'>
                <div className='text-white text-5xl font-extrabold '>
                    Secret Recovery Phrase
                </div>
            </div>
            <div className='flex justify-center 3'>
                <div className='text-gray-400 text-xl font-semibold pr-2 mt-2'>
                    Warning : Copy and securely store your mnemonic phrase. If you lose it, you won’t be able to recover your wallet or access your funds!
                </div>
            </div>
            <div className='flex justify-center w-2/6 ml-20 mt-3 pl-4'>
                <button title='import a wallet' className='bg-white h-12 w-20 rounded-md text-lg font-semibold ml-6'>
                    Import
                </button>
                <button title='generate a wallet' className='bg-white h-12 w-40 rounded-md text-lg ml-6 font-semibold' onClick={() => {
                setMnemonic(generateMnemonic());
                    setIsWalletGenerated(true);
                }}>
                    Generate a wallet
                </button>
            </div>
        </div>
        }
    </div>
  )
}

