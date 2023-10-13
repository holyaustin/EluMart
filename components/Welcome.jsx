import Image from 'next/image'

const Welcome = () => {

  return (
    <div className="flex w-full mf:flex-row flex-col justify-left bg-gray-100 mt-5">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-col mf:mr-10 font-bold">
          
          <div className="md:flex-[0.8] flex-initial justify-left items-center">
                {/**
              <h1 className="text-5xl sm:text-7xl font-semibold">
              EluMart  <br />
                </h1><br />
                
              <p className="text-left mt-1 text-blue-700 md:w-10/12 w-11/12 text-2xl font-black">
              Onchain Multimedia Marktetplace Built with Solana, Elusiv and Shyft <br />
              </p><br /> */}
              <img src="/images/blockchainbanner.jpg"  alt="welcome"  className="w-screen cursor-pointer items-center" />
          </div>

          <br />
          <div className="flex justify-center items-center">
          <a href="/register" className="font-bold">
            <button
              type="button"
              className="flex flex-row justify-center items-center  w-full my-5 text-white bg-blue-900 px-5 py-4 rounded-full cursor-pointer hover:bg-yellow-500 hover:text-white border-4 border-x-red-500 text-2xl"
            >
              Join Now
          </button>
          </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Welcome;
