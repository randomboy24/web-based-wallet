const Home = () => {
  return (
    <div className="bg-black h-screen w-screen flex justify-center">
      <div>
        <div className="text-white text-5xl font-bold mt-40 ml-52 w-3/6">
        WebVault: The vault where your crypto and peace of mind coexist.
        </div>
        <div className="  text-2xl text-gray-300 ml-52 mt-3">
          Choose a blockchain to get started.
        </div>
        <div className="mt-5">
          <button className="text-black bg-white ml-52 h-12 w-36  rounded-lg">
            Solana
          </button>
          <button className="text-black bg-white ml-2 h-12 w-40  rounded-lg">
            Ethereum
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home