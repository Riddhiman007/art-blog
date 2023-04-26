import React from "react";
import { FaBlog } from "react-icons/fa";

export default function dashboard() {
  return (
    <div className="container mx-auto mt-8 py-10">
      <div className="flex w-full flex-col flex-wrap justify-evenly gap-4 lg:flex-row">
        <div className=" flex flex-row flex-wrap gap-6 rounded-md bg-blue-800 py-4 pr-6 shadow-blue-500 drop-shadow-md">
          <div className=" px-6 py-4">
            <FaBlog className="text-7xl text-blue-50" />
          </div>
          <div className="flex flex-col flex-wrap gap-4 ">
            <div>
              <div>
                <p className="text-lg text-blue-50">Posts:</p>
              </div>
              <div className="">
                <h3 className="text-right text-6xl text-blue-50">1527</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-zinc-800 px-6 py-4 shadow-blue-500 drop-shadow-md ">
          <div>
            <p className="text-blue-50">Posts:</p>
          </div>
          <div className="">
            <h3 className="text-right text-6xl text-blue-50">1527</h3>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-emerald-700 px-6 py-4 shadow-blue-500 drop-shadow-md ">
          <div>
            <p className="text-blue-50">Posts:</p>
          </div>
          <div className="">
            <h3 className="text-right text-6xl text-blue-50">1527</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
