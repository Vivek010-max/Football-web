"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Spotlight } from "@/components/ui/Spotlight"
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
        
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
          Feel The Pulse Football Redefined
        </h1>
        
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Get real-time stats, tactical breakdowns, and player insights — all in one place.
          Perfect for fans, analysts, and fantasy football enthusiasts alike.
        </p>
         <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
  <Link
    href="/signup"
    className="px-6 py-2 rounded-full border border-white/20 bg-transparent transition hover:bg-white/10"
  >
    <span className="text-sm sm:text-base font-bold font-sans bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
      Sign Up
    </span>
  </Link>
  <Link
    href="/login"
    className="px-6 py-2 rounded-full border border-white/20 bg-transparent transition hover:bg-white/10"
  >
    <span className="text-sm sm:text-base font-bold font-sans bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600">
      Login
    </span>
  </Link>
</div>


       

               
      </div>

      <BackgroundBeams />
    </div>
  );
}
