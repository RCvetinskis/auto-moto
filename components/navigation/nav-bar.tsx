"use client";

import useRoutes from "@/hooks/useRoutes";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export const NavBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const routes = useRoutes();
  const { isLoaded } = useUser();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isLoaded) {
    return (
      <nav className="fixed top-0 w-full py-3 px-2 md:px-6  h-16 z-50 !bg-black text-gray-300">
        <div className="flex justify-between items-center">
          {[...Array(5)].map((_, i) => (
            <NavItemSkeleton key={i} />
          ))}
        </div>
      </nav>
    );
  }
  return (
    <nav className="fixed top-0 w-full py-3 px-2 md:px-6 h-16 z-50 !bg-black text-gray-300">
      <div className="flex justify-between items-center">
        {routes.map((route) => (
          <NavItem
            key={route.label}
            href={route.href}
            active={route.active}
            label={route.label}
            Component={route.Component}
          />
        ))}
      </div>
    </nav>
  );
};
