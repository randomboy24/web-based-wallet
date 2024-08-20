export const WalletSelection = ({setIsEthereum,setIsSolana}:any) => {
    return (
        <div className="flex justify-center">
            <div>
                <div className="text-white text-5xl font-bold mt-24 ml-52 w-3/6">
                WebVault: The vault where your crypto and peace of mind coexist.
                </div>
                <div className="  text-2xl text-gray-300 ml-52 mt-3">
                    Choose a blockchain to get started.
                </div>
                <div className="mt-5">
                    <button className="text-black bg-white ml-52 h-12 w-36  rounded-lg" onClick={() => {
                        setIsSolana(true)
                    }}>
                    Solana
                    </button>
                    <button className="text-black bg-white ml-2 h-12 w-40  rounded-lg" onClick={() => {
                        setIsEthereum(true)
                    }}>
                    Ethereum
                    </button>
                </div>
            </div>
        </div>
    )
}