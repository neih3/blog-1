import React from "react";
import SVGImage from "./components/SVGImage";
import InputSearch from "./components/InputSearch";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex items-center justify-between px-10">
        <Link to="/">
          <SVGImage />
        </Link>
        <InputSearch />
      </div>
    </div>
  );
}
