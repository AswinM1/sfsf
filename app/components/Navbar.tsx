"use client"
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-black  px-4">Brain.io</div>

      
      <div className="hidden md:flex space-x-6 items-center ">
        <a href="#" className="text-gray-700">Home</a>
        <a href="#" className="text-gray-700">Features</a>
        
        <Link href={"/login"} > <button className="bg-gradient-to-t from-black to-neutral-800 shadow-lg shadow-black/20 cursor-pointer text-white px-4 py-2 rounded-lg">Login</button>
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
            <a href="#" className="text-gray-700">Home</a>
            <a href="#" className="text-gray-700">Features</a>
            <a href="#" className="text-gray-700">Pricing</a>
            <a href="#" className="text-gray-700">About</a>
            <button className="bg-black text-white px-4 py-2 rounded-lg w-full">Login</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
