import React from "react";
import { SignUp } from "@clerk/clerk-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Signup() {
  return (
    // <div>
    //   <SignUp />
    // </div>
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default Signup;
