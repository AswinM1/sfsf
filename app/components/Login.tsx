"use client";
import { useState } from "react";
import  { useRouter } from "next/navigation"
import Link from "next/link";
import { toast,ToastContainer } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const Router =useRouter()
  
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      
      const res = await fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
          "Content-Type": "application/json",
        },
    });
    
    const data = await res.json();
    
    if (data.success===true) {
        setMessage("Login successful");
        toast.success(message)
        console.log("hello")
        Router.push("/dashboard")
    
      // No need to store the token manually, it's in the cookie already
    } else {
      setMessage(data.message || "Login failed");
      toast.error(message)
      console.log("user not found")
      Router.push("/signup")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="flex w-full">
       
        <div className="flex justify-center items-center mx-auto bg-neutral-900">
      <form
        onSubmit={handleLogin}
        className="p-8  w-100  "
      >
        <h2 className="text-2xl font-semibold mb-4 text-center font-sans text-white tracking-tight">Login</h2>
        <div className="h-px bg-gray-500 my-4"></div>
        <label className="text-neutral-400 ">Email</label>
        <input
          type="email"
          placeholder="sample@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-5 p-2 mt-2 border rounded text-white font-sans"
          required
        />
         <label className="text-neutral-400 ">Password</label>
        <input

          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 mt-2 p-2 border rounded text-neutral-400 font-sans"
          required
         
        />
        <button
          type="submit"
          className="w-full  shadow-md   font-sans bg-neutral-300 cursor-pointer mb-4 text-black p-2 rounded hover:bg-neutral-400"
        >
          Login
        </button>
        <ToastContainer></ToastContainer>
        <div className="h-px bg-gray-300 my-4"></div>
        <p className=" font-sans  font-medium text-sm flex justify-center mt-3 text-neutral-400 underline"><Link href={"/signup"} >Signup Now</Link></p>
      </form>
      </div>
      </div>
    
    </div>
  );
}
