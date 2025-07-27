"use client"; 

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover" href="#">About us</a>
        <a className="link link-hover" href="#">Contact</a>
        <a className="link link-hover" href="#">Jobs</a>
        <a className="link link-hover" href="#">Press kit</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="#" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
            </svg>
          </a>
          <a href="#" aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631..." />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l..." />
            </svg>
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights
          reserved by Football Stats Inc
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
