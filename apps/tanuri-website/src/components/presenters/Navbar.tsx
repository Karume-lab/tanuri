"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DownloadAppButton from "@/components/presenters/DownloadAppButton";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAVIGATION_ITEMS } from "@/data";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  let scrollTimeout: NodeJS.Timeout;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsVisible(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  });

  return (
    <NavigationMenu
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-primary rounded-md p-2 shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <NavigationMenuList>
        {NAVIGATION_ITEMS.map(({ href, label, Icon }) => (
          <Tooltip key={href}>
            <TooltipTrigger>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-primary-foreground"
                  >
                    <Icon className="w-5 h-5" />
                    <TooltipContent side="bottom">
                      <h2>{label}</h2>
                    </TooltipContent>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </TooltipTrigger>
          </Tooltip>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
