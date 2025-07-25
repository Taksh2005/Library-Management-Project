import React from "react";
import Button from "./Button";
import Link from "next/link";

function Navbar() {
  return (
    <div className="border border-gray-600 rounded-xl bg-gray-800 m-2 sticky h-10 flex flex-row items-center px-4 justify-between">
      <div className="">logo</div>
      <div className="flex flex-row items-center gap-5">
        <div className=" bg-gray-950 rounded-xl py-0.5 px-2 w-50 text-gray-400">
          Search
        </div>
        <div className="flex flex-row gap-5">
          <Link href={"/"} className="text-gray-300 hover:text-gray-100">
            Home
          </Link>
          <Link
            href={"/contacts"}
            className="text-gray-300 hover:text-gray-100"
          >
            Contacts
          </Link>
          <Link href={"/about"} className="text-gray-300 hover:text-gray-100">
            About
          </Link>
          <Link href={""}></Link>
          <Link href={""}></Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
