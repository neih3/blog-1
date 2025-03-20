import SVGImage from "./components/SVGImage";
import InputSearch from "./components/InputSearch";
import { Link } from "react-router-dom";
import Drawbar from "./components/Drawbar";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function Header() {
  return (
    <div className="border-b-2 border-gray-200">
      <div className="flex items-center justify-between px-10 py-4">
        <Link to="/">
          <SVGImage />
        </Link>
        <div className="flex items-center gap-3">
          <div className="block sm:hidden">
            <Drawbar />
          </div>
          <div className="hidden sm:block">
            <InputSearch />
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}
