"use client";
// import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

import NavbarConfig from "../static/scripts/navbar";

export default function Navbar() {
  React.useEffect(() => NavbarConfig(document.getElementById("mainNav")));
  return (
    <nav
      className="lg:navbar navbar-dark hidden flex-nowrap justify-start !bg-slate-100"
      id="mainNav"
    >
      <div className="container mx-auto flex h-[66px] flex-nowrap items-center justify-between !px-6 lg:!px-12">
        <a className="navbar-brand font-extrabold !text-slate-800 no-underline">
          Art Blog
        </a>
        <div className="hidden h-[66px] flex-grow align-middle lg:!flex lg:basis-auto">
          <ul className="navbar-nav !ml-auto !py-6 lg:flex-row lg:!py-0">
            <li key="home" className="nav-item">
              <Link className="nav-link py-4 lg:!px-4 lg:!py-6" href="/">
                Home
              </Link>
            </li>
            <li key="Post" className="nav-item">
              <Link className="nav-link py-4 lg:!px-4 lg:!py-6" href="/">
                Post
              </Link>
            </li>
            <li key="About" className="nav-item">
              <Link className="nav-link py-4 lg:!px-4 lg:!py-6" href="/">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
