import React from 'react';
import { AccordionItem } from './Accordian';
export const Wallet: React.FC = () => {
    const publicKey = "4f5b3c1e1b29ab9dcd9f41dbe3a15e223fcfca6b8d9129f1c5a22e2a3c0f5f90"; // Replace with your actual public key
    const privateKey = "4f5b3c1e1b29ab9dcd9f41dbe3a15e223fcfca6b8d9129f1c5a22e2a3c0f5f90"; // Replace with your actual private key
    return (
        <div>
            <AccordionItem title="Wallet Details" publicKey={publicKey} privateKey={privateKey} />
        </div>
    );
}


