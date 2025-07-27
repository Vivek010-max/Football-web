// components/Footer.tsx
"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 py-10 px-6 sm:px-10 md:px-20 lg:px-24 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-12 rounded-t-xl shadow-lg">

      
      <nav className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-lg font-medium order-2 md:order-1 w-full md:w-auto">
        <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-300">About us</a>
        <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-300">Contact</a>
        <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-300">Jobs</a>
        <a href="#" className="text-neutral-300 hover:text-white transition-colors duration-300">Press kit</a>
      </nav>

      
      <div className="flex-grow text-center order-1 md:order-2 w-full md:w-auto mt-4 md:mt-0">
        <p className="text-base text-neutral-300 whitespace-nowrap">
          Made with love for football <span className="text-red-500">❤️</span>
        </p>
      </div>

      <div className="flex justify-center md:justify-end order-3 w-full md:w-auto mt-4 md:mt-0">
        <nav className="flex gap-6">
          <a href="#" aria-label="X (formerly Twitter)" className="text-neutral-400 hover:text-white transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.21-.685-6.684-9.358L2.25 21.75H.985l8.132-10.287L.238 2.25h3.359l5.479 9.175L18.244 2.25zm-2.91 16.664l.907.828h3.308l-6.072-8.08L14.475 2.25h-3.414l-4.116 5.86-5.915-5.86H.985l8.55 11.332L.238 21.75h3.359l5.656-7.467 6.138 7.467z" />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="text-neutral-400 hover:text-red-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M20.2 6.78c-.76-.23-1.46-.35-2.2-.42-1.7-.16-3.4-.2-5.1-.2s-3.4.04-5.1.2c-.74.07-1.44.19-2.2.42C2.18 7.3 1.8 8.08 1.8 9.06v5.88c0 .98.38 1.76.9 2.28.76.23 1.46.35 2.2.42 1.7.16 3.4.2 5.1.2s3.4-.04 5.1-.2c-.74-.07-1.44-.19-2.2-.42.52-.28.9-.96.9-1.94V9.06c0-.98-.38-1.76-.9-2.28zM9 15.01V9.01l5.19 3.01L9 15.01z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="text-neutral-400 hover:text-blue-600 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.27 0-4.192 1.543-4.192 4.615v3.385z" />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
