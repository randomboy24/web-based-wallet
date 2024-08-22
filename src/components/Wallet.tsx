import React, { useEffect, useState } from 'react';
import { AccordionItem } from './Accordian';

interface propTypes {
    publicKey: string;
    privateKey: string;
    walletCount: number
}

export const Wallet = ({ publicKey, privateKey ,walletCount}: propTypes) => {

    return (
        <div>
            <AccordionItem publicKey={publicKey} privateKey={privateKey} walletCount={walletCount} />
        </div>
    );
}










