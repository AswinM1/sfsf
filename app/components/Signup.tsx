"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const Router =useRouter()
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success===true) {
      setMessage("Signup successful");
      console.log("hello")
      setEmail("");
      setPassword("");
      Router.push("/login")
    } else {
      setMessage(data.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-200">
      <form
        onSubmit={handleSignup}
        className="bg-neutral-100 p-8 rounded-md shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-black font-sans tracking-tighter">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-t from-black shadow-lg border border-neutral-700 to-neutral-800 text-white p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
           <p className="text-black font-sans tracking-tighter font-medium text-sm flex justify-center ">Already a user?  <Link href={"/login"}  >Login</Link></p>
      </form>
    </div>
  );
}
