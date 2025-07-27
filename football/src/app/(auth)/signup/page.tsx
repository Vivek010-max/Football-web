// app/(auth)/signup/page.tsx
"use client"; // This is needed because SignupFormDemo is a client component.

import React from "react";
import { SignupFormDemo } from "@/components/SignupFormDemo";

export default function SignupPage() {
  return (
    <div
      // This div handles the full screen background image
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/signupbg.jpg')" }} // <-- YOUR IMAGE PATH HERE!
    >
      
      <div className="absolute inset-0 bg-black opacity-50"></div>

      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <SignupFormDemo />
      </div>
    </div>
  );
}