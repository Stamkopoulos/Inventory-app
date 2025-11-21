import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        <Badge
          variant="secondary"
          className="rounded-full py-1 border-border"
          asChild
        >
          <Link href="#">
            Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          Smart Inventory Management for Your Business
        </h1>
        <p className="mt-6 md:text-lg">
          Gain full control of your stock, categories, and pricing in one
          powerful dashboard. Simplify operations and boost efficiency for your
          business.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Link to="/inventory">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
