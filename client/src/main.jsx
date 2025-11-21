import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/react-router";

import "./index.css";

import App from "./App";
import Auth from "./pages/Auth";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
