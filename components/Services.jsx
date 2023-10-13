/* eslint-disable max-len */
//import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
//import logo1 from "../images/headphone.jpeg";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row p-3 m-2 cursor-pointer hover:shadow-xl text-left object-left justify-items-start">
    <div className={`text-left w-10 h-10 rounded-full flex object-left justify-items-start items-left ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1 ">
      <h3 className="mt-2 text-black text-xl">{title}</h3>
      <p className="text-left mt-1 text-black text-sm md:w-11/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Services = () => (
  <div className=" flex w-full justify-center items-center bg-blue-700">
    <div className="flex items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start mx-1 sm:mx-10">
        <h1 className="text-black text-3xl sm:text-5xl py-2 ">
          Blockchain Musical Arts NFTs :  Check our Marketplace
          <br /> <br />
        </h1>
        <p className="my-2 text-black font-light md:w-11/12 w-11/12 text-2xl text-justify">
          Join the movement now and mint your music on-chain. This is made possible by leveraging the speed of solana and the NFT compression techniques that is allowing large files to be minted through compression.
        </p>
        <br />
        <div className="md:flex-[0.8] flex-initial justify-left items-center">
.
          <img src="/images/bg.png" alt="welcome" className="w-100 cursor-pointer" />
        </div>

      </div>

      <div className="flex flex-col text-xl text-black object-left justify-items-start items-left place-items-start">
        <ServiceCard
          color="bg-[#000000]"
          title="Mint your Muisc  Videos"
          icon={<BsShieldFillCheck fontSize={21} className="text-blue-700" />}
          subtitle="Reharse you favourite song"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Mint your Music Digital Art"
          icon={<BiSearchAlt fontSize={21} className="text-blue-700" />}
          subtitle="Do a video of the song."
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Transfer Assets to Others with ease"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="Upload song on Talent Musica"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Burn NFTs if you dont want them any longer "
          icon={<BsShieldFillCheck fontSize={21} className="text-blue-700" />}
          subtitle="Watch people watch your song  "
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Pay low gas fees"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="You get contacted on your twitter handle"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Compress Large files as NFTs on chain"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="You get contacted on your twitter handle"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Stream favourite Music Online"
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="You get contacted on your twitter handle"
        />
        <ServiceCard
          color="bg-[#000000]"
          title="Collect your Musical Arts "
          icon={<RiHeart2Fill fontSize={21} className="text-blue-700" />}
          subtitle="You get contacted on your twitter handle"
        />
      </div>
      
    </div>
    
  </div>
);

export default Services;
