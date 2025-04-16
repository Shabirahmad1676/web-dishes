import React from "react";
import Random from "./Random";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex  mx-auto p-4 bg-white rounded shadow items-center justify-center">
      <div className="flex mx-auto w-[1280px] items-center justify-between">
        <h1 className="text-black text-2xl font-[fangsong] font-bold">🍽Hpal Kitchen</h1>
      
      <Random/>
      </div>
    </div>
  );
};

export default Header;
