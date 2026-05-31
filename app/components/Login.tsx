"use client";
import { useState } from "react";
import Router, { useRouter } from "next/navigation";
import Link from "next/link";

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
        console.log("hello")
        Router.push("/dashboard")
    
      // No need to store the token manually, it's in the cookie already
    } else {
      setMessage(data.message || "Login failed");
      console.log("user not found")
      Router.push("/signup")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200">
      <div className="flex w-full">
        <div className="md:flex w-1/2 h-screen bg-gradient-to-t from-purple-400 to-blue-300 md:visible hidden"></div>
        <div className="flex justify-center items-center mx-auto bg-neutral-200">
      <form
        onSubmit={handleLogin}
        className="p-8  w-80 rounded-md "
      >
        <h2 className="text-2xl font-bold mb-4 text-center font-sans text-black tracking-tight">Login</h2>
        <p className="font-medium text-sm mx-auto justify-center flex mb-3 text-neutral-800 font-sans tracking-tight">Hello please login into your account</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-black"
          required
        />
        <input

          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded text-black"
          required
         
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-t from-black to-neutral-700 shadow-md   text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
        <p className="text-black font-sans tracking-tight font-medium text-sm flex justify-center mt-3">New user?   <Link href={"/signup"} >  Signup</Link></p>
      </form>
      </div>
      </div>
    
    </div>
  );
}
