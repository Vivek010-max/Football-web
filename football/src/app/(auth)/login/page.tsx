
"use client"; 
import React from "react";
import { LoginFormDemo } from "@/components/LoginFormDemo"; 

export default function LoginPage() {
  return (
    <div

      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      
      style={{ backgroundImage: "url('/images/signupbg.jpg')" }}
    >
       
      <div className="absolute inset-0 bg-black opacity-50"></div>

     
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <LoginFormDemo />
      </div>
    </div>
  );
}
