"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { useScrollDirection } from "@/hooks";
import { cn } from "@/lib/utils";
import { Logo } from ".";

const Navbar = () => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrollDirection === "down" && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle />
      </div>
    </div>
  );
};
export default Navbar;
