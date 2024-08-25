import React from 'react';
import { AccordionItem } from './Accordian';

interface propTypes {
    publicKey: string;
    privateKey: string;
    walletCount: number
    isSolana:boolean;
    balance:number
}

export const Wallet = ({ publicKey, privateKey ,walletCount,isSolana,balance}: propTypes) => {
console.log(publicKey)

    return (
        <div>
            <AccordionItem publicKey={publicKey} privateKey={privateKey} walletCount={walletCount} isSolana={isSolana} balance={balance} />
        </div>
    );
}










