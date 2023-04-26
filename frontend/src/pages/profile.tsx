import React from "react";
import { Avatar } from "@mui/material";
import Image from "next/image";
import david from "../static/img/david.jpg";

export default function profile() {
  return (
    <div className="container mx-auto py-10">
      {/* profile area */}
      <div className="my-8 flex w-full flex-row gap-2 rounded-md bg-white py-6 drop-shadow-lg lg:ml-6 lg:w-fit">
        {/* Avatar */}
        <div className="px-4">
          <Avatar sizes="2xl" className="mx-auto h-10 w-10">
            <Image
              fill
              className="m-auto inline-block h-[5rem] w-[5rem] rounded-full ring-2 ring-white"
              src={david}
              // src="/img/logos/k_favicon.ico"
              alt=""
            />
          </Avatar>
        </div>
        {/* profile */}
        <div className="mr-6 flex flex-col flex-wrap gap-1 whitespace-pre-wrap">
          <h3 className="!mb-0 font-sans font-semibold">
            Basundhara Rudranarayan Chowdhury
          </h3>
          <p className="text-lg text-blue-800">Mini007</p>
          <p className="text-base italic text-neutral-700 text-opacity-75">
            basu@gmail.com
          </p>
        </div>
      </div>
      {/* posts, exhibition and friends */}
      <div></div>
    </div>
  );
}
