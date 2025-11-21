import { SignIn, SignUp } from "@clerk/clerk-react";

export default function Auth() {
  return (
    <div className="flex gap-10 justify-center p-10">
      <SignIn path="/auth/sign-in" routing="path" signUpUrl="/auth/sign-up" />
      <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" />
    </div>
  );
}
