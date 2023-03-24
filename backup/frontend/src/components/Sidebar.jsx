"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";
import NavbarConfig from "../scripts/navbar";
import { Disclosure, Menu } from "@headlessui/react";
// import NavbarConfig from '../scripts/navbar'
// import Script from 'next/script'
// import SidebarConfig from '../scripts/sidebar'

function Sidebar(props) {
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const mainNav = document.getElementById("mainNav");
    window.addEventListener("scroll", () => {
      if (mainNav.classList.contains("is-visible")) {
        console.log(false);
        sidebar.classList.add("go-down");
      } else if (mainNav.classList.contains("is-fixed")) {
        console.log(true);
        sidebar.classList.remove("go-down");
        sidebar.classList.add("go-up");
      } else {
        console.log("now");
        sidebar.classList.add("go-down");
      }
    });
  });
  return (
    <>
      <Disclosure as="nav" className={"h-full"}>
        {/* <Disclosure.Button as='button' className='sticky top-4 p-4 right-0 rounded-full bg-slate-900 text-slate-100'>
                    m
                </Disclosure.Button> */}
        <div
          className="sidebar-trans fixed top-0 left-0 z-10 h-full w-1/2 overflow-y-auto overflow-x-hidden bg-slate-50 lg:w-60 xxl:w-[20rem]"
          id="sidebar"
        >
          <div key="user-info" className="container border-r-2">
            {/* avatar */}
            <div key="avatar" className="flex justify-center p-12">
              {/* <Image
                width={80}
                height={80}
                className="m-auto inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /> */}
            </div>
            {/* nav items */}
            <hr
              key="hierchy"
              className="my-4 overflow-y-auto overflow-x-hidden"
            />
            <div key="nav-items" className="mt-8 h-full">
              <div className="mx-4 flex flex-col flex-wrap items-stretch gap-1 !p-0 [align-content:stretch]">
                <Link
                  href="/"
                  className="group z-10 mb-2 bg-slate-50 px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 focus-within:shadow-lg hover:rounded-lg hover:bg-neutral-900 hover:shadow-xl hover:shadow-neutral-900"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-900 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50"
                    />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Home
                    </h5>
                  </div>
                </Link>
                <Menu>
                  <Menu.Button
                    as={Link}
                    href="/"
                    className="group mb-2 bg-slate-50 px-4 py-2 outline-transparent focus-within:bg-neutral-900 hover:rounded-lg hover:bg-neutral-900 hover:shadow-xl hover:shadow-neutral-900 focus:rounded-lg"
                  >
                    <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-900 shadow-neutral-900 focus-within:shadow-lg group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50"
                      />
                      <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                        Posts
                      </h5>
                    </div>
                  </Menu.Button>
                  <Menu.Items
                    as="div"
                    className="mx-auto mb-2 flex flex-col items-start px-4 py-2"
                  >
                    <Menu.Item
                      as={Link}
                      href="/"
                      className="side-item group mx-3 mb-2 w-full text-left hover:rounded-lg hover:bg-neutral-900 hover:text-neutral-50"
                    >
                      <div className=" mx-auto my-2 ml-4 block items-start gap-3 px-2 text-neutral-500 group-hover:text-neutral-50">
                        <span className="mx-auto text-left">Create Post</span>
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
      {/* <Script src='../script/sidebar.js' strategy='afterInteractive' /> */}
    </>
  );
}

export default Sidebar;
