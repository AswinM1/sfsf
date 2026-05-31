import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section
      className="
        min-h-screen
        bg-neutral-900
        text-white
        font-sans
        px-4
        py-20
        overflow-y-auto
      "
    >
      <div
        className="
          max-w-4xl
          mx-auto
          flex
          flex-col
          items-center
          text-center
        "
      >
        {/* Heading */}
        <h1
          className="
            text-4xl
            md:text-6xl
            font-semibold
            tracking-tight
            leading-tight
            max-w-4xl
            text-neutral-100
          "
        >
          Capture, organize, and recall everything all in one place
        </h1>

        {/* Description */}
        <p
          className="
            mt-6
            text-neutral-400
            text-base
            md:text-lg
            max-w-2xl
          "
        >
          Save links, notes, and resources. Revisit everything without
          the noise. Minimal, clean, and fast.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link href="/dashboard">
            <button
              className="
                bg-neutral-200
                text-black
                px-6
                py-3
                rounded-xl
                text-sm
                md:text-base
                font-medium
                border
                border-neutral-700
                hover:bg-white
                transition-all
                cursor-pointer
                shadow-xl
                shadow-black/30
              "
            >
              Get Started
            </button>
          </Link>
        </div>

        {/* Video */}
        <div
          className="
            mt-16
            w-full
            flex
            justify-center
          "
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="
              w-full
              max-w-5xl
              rounded-2xl
              border
              border-neutral-800
              shadow-2xl
              shadow-black/40
            "
          >
            <source
              src="/bookmarkit.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}