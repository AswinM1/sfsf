import React from "react";
import Features from "./Features";
import img2 from '../../public/bg.png'
import Link from "next/link";
import img1 from './../../public/Rectangle 4.png'
import Image from "next/image";
export default function Hero() {
  return (
    <div className=" bg-gradient-to-b from-white to-violet-400 text-black dark:text-white py-20 px-4 text-center h-screen w-full justify-center items-center mx-auto  border-dashed "
    >
   
    <div className="font-sans tracking-tight text-md z-10  bg-purple-400 w-fit px-4 border-violet-800 border-2 text-black py-2 justify-center flex items-center mx-auto mb-3 rounded-full">New features coming soon</div>
      <h1 className=" text-black text-2xl md:text-6xl  z-10 font-bold font-sans md:mx-auto md:w-200 w-100  items-center mx-auto justify-center flex  tracking-tight  mb-4">Capture, organize, and recall everything   all in one place.</h1>
      <p className="text-lg md:text-2xl mb-6 max-w-xl mx-auto text-neutral-500">
        
      </p>
      <Link href={"/dashboard"}>
      <button className="bg-gradient-to-t from-black to-neutral-800  text-white font-medium px-6 py-3 rounded-md shadow-black/40 border border-neutral-700  shadow-lg hover:bg-neutral-800 cursor-pointer transition w-fit">
        Get Started 
      </button>
      </Link>
     
      <div className="mt-60"><Features></Features></div>
    </div>
    
    
  );
}




