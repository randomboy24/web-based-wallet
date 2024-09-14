

export const WalletSelection = ({setIsEthereum,setIsSolana}:any) => {
    return (
        <div className="flex justify-center">
            <div className="md:w-[67%] w-[100%] border border-white mt-32" >
                <div className="text-white text-5xl font-bold  ml-2  w-[90%] md:w-[65%]">
                WebVault: The vault where your crypto and peace of mind coexist.
                </div>
                <div className="  text-2xl text-gray-300 ml-2  mt-3">
                    Choose a blockchain to get started.
                </div>
                <div className="mt-5">
                    <button className="text-black bg-white ml-2 h-12 w-36 hover:bg-gray-800 hover:text-gray-200 rounded-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {
                        setIsSolana(true)
                        localStorage.setItem('isSolana','true')
                    }}>
                    Solana
                    </button>
                    <button className="text-black bg-white ml-2 h-12 w-40 hover:bg-gray-800 hover:text-gray-200  rounded-lg transform transition-transform duration-300 hover:scale-105" onClick={() => {
                        setIsEthereum(true)
                        
                    }}>
                    Ethereum
                    </button>
                </div>
            </div>
        </div>
    )
}