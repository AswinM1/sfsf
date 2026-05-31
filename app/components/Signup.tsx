"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
 import { ToastContainer, toast } from 'react-toastify';
  

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const Router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let data;

    try {
      data = await res.json();
    } catch (error) {
      setMessage("Invalid server response");
      return;
    }

    if (res.ok && data.success) {
      setMessage("Signup successful");
       toast.success(message)
      setEmail("");
      setPassword("");

      Router.push("/login");
    } else {
      setMessage(data.message || "Signup failed");
      toast.error(message)
    }
  }; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <form
        onSubmit={handleSignup}
        className="bg-neutral-900 p-8 rounded-md w-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-neutral-300 font-sans tracking-tight">
          Sign Up
        </h2>

        <div className="h-px bg-gray-500 my-4"></div>

        <label className="text-neutral-400">Email</label>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-5 p-2 mt-2 border rounded text-white font-sans"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="h-px bg-gray-500 my-4"></div>

        <label className="text-neutral-400">Password</label>

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 p-2 mt-2 border rounded text-white font-sans"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full shadow-md font-sans bg-neutral-300 cursor-pointer mb-4 text-black p-2 rounded hover:bg-neutral-400"
        >
          Signup
        </button>

       <ToastContainer></ToastContainer>

        <p className="text-neutral-400 underline font-sans tracking-tight font-medium text-sm flex justify-center">
          Already a user?{"    "}
          <Link href={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
}