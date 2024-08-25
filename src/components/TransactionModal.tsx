import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js"
import { useState } from "react"
import bs58 from'bs58';


interface propTypes {
    isSolana:boolean
    pubKey:string,
    privKey:string
}


export const TransactionModal = ({isSolana,pubKey,privKey}:propTypes) => {
    console.log(isSolana)
    const [receiverPubKey,setReceiverPubKey] = useState("")
    const [sendingAmount,setSendingAmount] = useState(0)

    const addTransaction = async () => {
        console.log(privKey)
        
        const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/3baDUOhezYw7SMpDwcabVbeJIMJPyp_N","confirmed")

        const senderPubKey = new PublicKey(pubKey);
        const receiverPublicKey = new PublicKey(receiverPubKey)
        const transferInstruction = SystemProgram.transfer({
            fromPubkey:senderPubKey,
            toPubkey:receiverPublicKey,
            lamports:sendingAmount * LAMPORTS_PER_SOL
        })

        const transaction =  new Transaction().add(transferInstruction)
        
        // console.dir(transferInstruction, { depth: null });
        // console.dir(transaction, { depth: null });
        // console.log('Sender Public Key:', senderPubKey.toBase58());
        // console.log('Receiver Public Key:', receiverPublicKey.toBase58());
        // console.log(JSON.stringify(transferInstruction))
        // console.log(JSON.stringify(transaction))

        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = senderPubKey;

        const senderKeypair = Keypair.fromSecretKey(bs58.decode(privKey));

        transaction.sign(senderKeypair)

        const serializedTransaction = transaction.serialize().toString('base64')

        console.log('serialized Transaction: ',serializedTransaction);

        const sendResponse = await fetch("https://solana-mainnet.g.alchemy.com/v2/3baDUOhezYw7SMpDwcabVbeJIMJPyp_N", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 2,
                method: "sendTransaction",
                params: [serializedTransaction],    
            }),
        });
        const sendResult = await sendResponse.json();
console.log('Full Send Response:', sendResult);

const transactionSignature = sendResult.result;

if (!transactionSignature) {
    console.error('Failed to obtain transaction signature:', sendResult);
    return; // Exit if there's no valid transaction signature
}

console.log('Transaction Signature:', transactionSignature);

// Confirm the transaction using confirmTransaction
try {
    const confirmation = await connection.confirmTransaction(transactionSignature, 'confirmed');
    console.log('Transaction Confirmation:', confirmation);

    if (confirmation.value?.err) {
        console.error('Transaction failed:', confirmation.value.err);
    } else {
        console.log('Transaction confirmed successfully.');
    }
} catch (error) {
    console.error('Error confirming transaction:', error);
}

    }
    return (
        <div className=" fixed inset-0 backdrop-blur-sm flex flex-col h-screen justify-center items-center text-white">
            <label htmlFor="receiver">To: </label>
            <input type="text" id="receiver" className="text-black"
            onChange={(e) => {
                setReceiverPubKey(e.target.value)
            }} />
            <label htmlFor="amount">{isSolana?"Sol: ":"Eth: "}</label>
            <input type="text" id="amount" className="text-black"
             onChange={(e) => {
                setSendingAmount(parseInt(e.target.value))
            }}
            />
            <button className="bg-white text-black mt-2" onClick={addTransaction}>
                Send
            </button>
        </div>
    )
}

