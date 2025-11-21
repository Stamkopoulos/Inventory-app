import React from "react";

import { Button } from "./ui/button";
import { Box, HomeIcon, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import Signup from "../pages/Signup";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/*Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold font-mono tracking-wider">
              📦Inventory
            </Link>
          </div>

          {/*Navbar components*/}

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/inventory">
                <Box className="w-4 h-4" />
                <span className="hidden lg:inline">Products</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/">
                <HomeIcon className="w-4 h-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            {/* <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link to="/Signup">
                <LogIn className="w-4 h-4" /> Sign In
                <span className=" lg:inline"></span>
              </Link>
            </Button> */}

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden lg:inline">Sign In</span>
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton mode="modal"></UserButton>
            </SignedIn>

            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
