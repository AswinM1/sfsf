"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-neutral-900 max-w-full min-w-3xl  mx-auto shadow-md px-6 py-4   flex items-center justify-between">
      <div className="text-xl font-semibold font-sans text-neutral-200  py-1   px-4">Bookmarks.it</div>

      
      <div className="hidden md:flex space-x-6 items-center ">
        <a href="/" className="text-neutral-300 font-sans text-[15px]" >Home</a>
     
        
        <Link href={"/login"} > <button className="bg-neutral-200 shadow-lg shadow-black/20 cursor-pointer text-black font-sans px-3 py-1 rounded-lg text-[15px]">Login</button>
    </Link>
      </div>
       

     
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-start px-6 py-4 space-y-3">
            <a href="#" className="text-neutral-300">Home</a>
            <a href="#" className="text-neutral-300">Login</a>
           
            <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
