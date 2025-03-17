import { Menu } from "lucide-react";
import React from "react";
import InputSearch from "./InputSearch";

export default function Drawbar() {
  return (
    <div>
      <div className="drawer drawer-end z-40">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <Menu />
          </label>
        </div>
        <div className="drawer-side" data-theme="light">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <InputSearch />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
