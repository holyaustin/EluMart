import Image from 'next/image'

const Welcome2 = () => {
  return (
    <div className="flex w-full mf:flex-row flex-col justify-left bg-gray-100 mt-5">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
        <div className="flex flex-col mf:mr-10 font-bold">
          <div className="md:flex-[0.8] flex-initial justify-left items-center">
              <br />
          <img src="/images/Sound.svg"  alt="welcome"  className="w-screen cursor-pointer items-center" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Welcome2;
