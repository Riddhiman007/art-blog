"use client";
import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";

// icons
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { HiHome } from "react-icons/hi2";
import { MdDashboard, MdLogin, MdLogout } from "react-icons/md";
import { HiUserAdd } from "react-icons/hi";

function Sidebar() {
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
    let scrollPos = 0;
    const headerHeight = sidebar.clientHeight;
    window.addEventListener("scroll", function () {
      const currentTop = document.body.getBoundingClientRect().top * -1;
      if (currentTop < scrollPos) {
        // Scrolling Up
        if (currentTop > 0 && sidebar.classList.contains("go-up")) {
          sidebar.classList.add("go-down");
        } else {
          console.log(123);
          sidebar.classList.remove("go-down", "go-up");
          sidebar.classList.add("go-down");
        }
      } else {
        // Scrolling Down
        sidebar.classList.remove("go-down");
        if (currentTop > headerHeight && !sidebar.classList.contains("go-up")) {
          sidebar.classList.add("go-up");
        }
      }
      scrollPos = currentTop;
    });
  });
  const { data } = useSession();
  return (
    <>
      <Disclosure as="nav" className="h-full" id="side-dis">
        {/* Disclosure Button */}
        <Disclosure.Button
          as="button"
          className="fixed top-4 right-4 z-50 m-4 rounded-md bg-neutral-900 lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} className="m-4 text-neutral-50" />
        </Disclosure.Button>
        {/* Sidebar panel */}
        <div
          className="sidebar-trans go-up fixed top-0 left-0 z-50 !block h-full w-1/2 overflow-y-auto overflow-x-hidden bg-[#deecf1f6] ui-not-open:-translate-x-96 md:w-40 lg:w-72 lg:ui-not-open:translate-x-0 xxl:w-[20rem]"
          id="sidebar"
        >
          <div key="user-info" className="container border-r-2">
            {/* avatar */}
            {
              /* user details */
              data ? (
                <div key="avatar" className="flex flex-col justify-center gap-2 p-12">
                  <div className="flex flex-row justify-center">
                    <Image
                      width={80}
                      height={80}
                      className="m-auto inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      // src="/img/logos/k_favicon.ico"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-col items-start">
                      {/* Fullname */}
                      <h3 className="mb-0 block w-full text-center font-serif text-lg font-semibold text-stone-900 lg:text-center lg:text-xl">
                        {data.user.FullName}
                      </h3>
                      {/* Email */}
                      <div className="my-2 block w-full text-center font-sans text-base text-stone-800">
                        {data.user.email}
                      </div>
                      {/* Username */}
                      <p className="block w-full text-center text-base text-zinc-700">
                        {data.user.username}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null
            }

            {/* nav items */}
            <hr
              key="hierchy"
              className="mb-4 overflow-y-auto overflow-x-hidden !text-zinc-700"
            />
            <div key="nav-items" className="mt-8 h-full">
              <div className="! mx-4 flex flex-col flex-wrap items-stretch gap-1 !p-0 [align-content:stretch]">
                {/* Home */}
                <Link
                  href="/"
                  className="group mb-2  px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <HiHome className="h-5 w-5 self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50" />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Home
                    </h5>
                  </div>
                </Link>

                {/* Dashboard */}
                <Link
                  href="/"
                  className="group mb-2  px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <MdDashboard className="h-5 w-5 self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50" />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Dashboard
                    </h5>
                  </div>
                </Link>

                {/* Divider */}
                <hr className="my-4 bg-zinc-800" />

                {/* Post */}
                <Menu>
                  <Menu.Button
                    as="div"
                    className="group z-50 mb-2  px-4 py-2 outline-transparent focus-within:bg-neutral-900 hover:rounded-lg hover:bg-neutral-900 hover:shadow-xl hover:shadow-neutral-700 focus:rounded-lg"
                  >
                    <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
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
                      // eslint-disable-next-line tailwindcss/no-custom-classname
                      className="side-item group mx-3 mb-2 w-full text-left  focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                    >
                      <div className=" mx-auto my-2 ml-4 block items-start gap-3 px-2 text-neutral-500">
                        <span className="mx-auto text-left group-hover:text-neutral-50 group-focus-visible:text-neutral-50">
                          Latest
                        </span>
                      </div>
                    </Menu.Item>
                    <Menu.Item
                      as={Link}
                      href="/"
                      // eslint-disable-next-line tailwindcss/no-custom-classname
                      className="side-item group mx-3 mb-2 w-full text-left  focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                    >
                      <div className=" mx-auto my-2 ml-4 block items-start gap-3 px-2 text-neutral-500">
                        <span className="mx-auto text-left group-hover:text-neutral-50 group-focus-visible:text-neutral-50">
                          My Posts
                        </span>
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
                {/* Create Post */}
                <Link
                  href="/posts/create"
                  className="group  mb-2  px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50"
                    />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Create Post
                    </h5>
                  </div>
                </Link>
                {/* Divider */}
                <hr className="z-0 my-4" />

                {/* Login */}
                <Link
                  href="/auth/login"
                  className="group  mb-2  px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <MdLogin className="h-5 w-5 self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50" />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Login
                    </h5>
                  </div>
                </Link>

                {/* Register */}
                <Link
                  href="/auth/register"
                  className="group  mb-2  px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <HiUserAdd className="h-5 w-5 self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50" />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Register
                    </h5>
                  </div>
                </Link>
                {/* Divider */}
                <hr className="my-4" />

                {/* Logout */}
                <Link
                  href="/"
                  className="group mt-4 mb-10 px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                >
                  <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus:bg-neutral-900 group-focus:text-neutral-50">
                    <MdLogout className="h-5 w-5 self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50" />
                    <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                      Logout
                    </h5>
                  </div>
                </Link>
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
/**
 * <Menu>
                  <Menu.Button
                    as={Link}
                    href="/"
                    className="group mb-2 mt-4  px-4 py-2 outline-transparent focus-within:rounded-lg focus-within:bg-neutral-900 hover:rounded-lg hover:bg-neutral-900 hover:shadow-xl hover:shadow-neutral-900"
                  >
                    <div className="my-auto flex flex-row items-stretch gap-3 text-neutral-800 shadow-neutral-900 group-hover:bg-neutral-900 group-hover:text-neutral-50 group-focus-visible:bg-neutral-900 group-focus-visible:text-neutral-50">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50"
                      />
                      <h5 className="ml-4 !mb-0 grow self-center text-center group-hover:text-neutral-50 group-focus:text-neutral-50">
                        Me
                      </h5>
                    </div>
                  </Menu.Button>
                  <Menu.Items
                    as="div"
                    className="mx-auto mb-2 flex flex-col items-start px-4 py-2"
                  >
                     //Register 
                    <Menu.Item
                      as={Link}
                      href="/user/register"
                      // eslint-disable-next-line tailwindcss/no-custom-classname
                      className="side-item group mx-3 mb-2 w-full text-left focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                    >
                      <div className=" mx-auto my-2 ml-4 block items-start gap-3 px-2 text-neutral-500">
                        <span className="mx-auto text-left group-hover:text-neutral-50 group-focus-visible:text-neutral-50">
                          Register
                        </span>
                      </div>
                    </Menu.Item>

                     //Login 
                    <Menu.Item
                      as={Link}
                      href="/"
                      // eslint-disable-next-line tailwindcss/no-custom-classname
                      className="side-item group mx-3 mb-2 w-full text-left  focus-within:bg-neutral-900 hover:z-30 hover:rounded-lg hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-700"
                    >
                      <div className=" mx-auto my-2 ml-4 block items-start gap-3 px-2 text-neutral-500">
                        <span className="mx-auto text-left group-hover:text-neutral-50 group-focus-visible:text-neutral-50">
                          Login
                        </span>
                      </div>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
 */
