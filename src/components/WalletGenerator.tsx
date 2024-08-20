"use client"
import React, { useState } from 'react'
import nacl from 'tweetnacl';
import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import { cookies } from 'next/headers';


export const WalletGenerator = () => {
    const [mnemonic,setMnemonic] = useState("");
    const seed = mnemonicToSeedSync(mnemonic);
    const [secret,setSecret] = useState('');

  return (
    <div>
        <div className='flex justify-center w-3/5 mt-10'>
            <div className='text-white text-5xl font-extrabold'>
                Secret Recovery Phrase
            </div>
        </div>
        <div className='flex justify-center 3'>
            <div className='text-gray-600 text-xl font-semibold pr-2 mt-2'>
                Warning : Copy and securely store your mnemonic phrase. If you lose it, you won’t be able to recover your wallet or access your funds!
            </div>
        </div>
        <div className='flex justify-center w-2/6 ml-20 mt-3 pl-4'>
            <button title='import a wallet' className='bg-white h-12 w-20 rounded-md text-lg font-semibold ml-6'>
                Import
            </button>
            <button title='generate a wallet' className='bg-white h-12 w-40 rounded-md text-lg ml-6 font-semibold' onClick={() => {
                setMnemonic(generateMnemonic())
                // console.log(mnemonic)
                const path = `m/44'/501'/1'/0'`;
                const derivedSeed = derivePath(path,seed.toString("hex")).key;
                setSecret((nacl.sign.keyPair.fromSeed(derivedSeed).secretKey).toString());
                // const encoder = new TextEncoder();
                // const secretInUintArray = encoder.encode(secret);
                // console.log(secret)
                // console.log(Keypair.fromSecretKey(secretInUintArray).publicKey.toBase58())
                console.log(secret)
            }}>
                Generate a wallet
            </button>
        </div>
    </div>
  )
}

