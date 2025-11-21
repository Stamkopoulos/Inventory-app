import { useUser } from "@clerk/clerk-react";
import InventoryTable from "../components/InventoryTable";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Inventory() {
  const { user } = useUser();

  if (!user)
    return (
      <div className="flex flex-col mt-20 items-center h-screen">
        <p className="text-center p-10 font-bold ">Please sign in first</p>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              <span className="hidden lg:inline">Sign In</span>
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    );

  return (
    <div className="p-10 max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-bold">📦 Inventory</h1>
        <UserButton afterSignOutUrl="/auth/sign-in" /> */}
      </div>

      <p>Welcome {user.fullName || user.primaryEmailAddress.emailAddress}!</p>

      <InventoryTable />
    </div>
  );
}
