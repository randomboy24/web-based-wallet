import { Wallet } from "./Wallet"

interface propTypes{
    isSolana:boolean,
    mnemonic:string
}


export const WalletGenerator = ({isSolana,mnemonic}:propTypes) => {
    return (
        <div>
            <div className="flex justify-center mt-10">
                <div className="flex justify-between w-2/3">
                    <div className="text-4xl text-white font-bold">
                        {isSolana?"Solanan Waller":"Ethereum Wallet"}
                    </div>
                    <div className="flex">
                        <button className="bg-gray-500 text-gray-900 h-12 w-40 mr-4 rounded-lg">
                            Add Wallet
                        </button>
                        <button className="bg-gray-500 text-gray-900 h-12 w-40 mr-16 rounded-lg">
                            Clear Wallets
                        </button>
                    </div>
                </div>
            </div>
            <Wallet />
        </div>
    )
}



