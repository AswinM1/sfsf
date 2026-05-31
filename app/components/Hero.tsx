import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section
      className="
        min-h-screen
        bg-neutral-900
        text-white
        flex items-center justify-center
        px-4
      "
    >
      <div className="text-center max-w-4xl mx-auto">

        <div
          className="
          mt-10
            text-[30px] md:text-[40px]
            max-w-xl
            font-sans
            tracking-tight
            leading-tight
            
            text-neutral-100
          "
        >
          Capture, organize, and recall everything all in one place
         
        </div>

        {/* Description */}
        <p
          className="
            mt-6
            text-neutral-500
            text-base md:text-lg
            max-w-2xl mx-auto
          "
        >
          Save links, Revisit it without the noise.minimal and clean 
        </p>

        
        <div className="mt-8">
          <Link href="/dashboard">
            <button
              className="
                bg-neutral-200
                text-black
                px-5 py-3
                rounded-lg
                text-sm md:text-base
                font-sans
                shadow-lg shadow-black/30
                border border-neutral-700
                hover:bg-white
                transition-all
                cursor-pointer
              "
            >
              Get Started
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}