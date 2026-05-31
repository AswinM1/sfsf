import React from "react";
import Features from "./Features";
import img2 from '../../public/bg.png'
import Link from "next/link";
import img1 from './../../public/Rectangle 4.png'
import Image from "next/image";
export default function Hero() {
  return (
    <div className=" bg-neutral-900  text-white py-20 px-4 text-center h-screen w-full justify-center items-center mx-auto  border-dashed "
    >
   
  
      <h1 className=" text-neutral-100 text-4xl md:text-4xl  z-10  font-sans md:mx-auto md:w-150 w-150  items-center mx-auto justify-center flex  tracking-tight  mb-4">Capture, organize, and recall everything   all in one place.</h1>
      <p className="text-lg md:text-2xl mb-6 max-w-xl mx-auto text-neutral-500">
        
      </p>
      <Link href={"/dashboard"}>
      <button className="bg-neutral-200 text-black font-sans    font-sans px-4 py-2 rounded-md shadow-black/40 border border-neutral-700  shadow-lg hover:bg-neutral-400 cursor-pointer transition w-fit text-[15px]">
        Get Started 
      </button>
      </Link>
     
    </div>
    
    
  );
}




