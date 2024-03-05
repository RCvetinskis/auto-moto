"use client";

import Link from "next/link";
import { HoverLabel } from "../hover-label";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { useNavDropDown } from "@/store/store";

interface NavItemProps {
  href?: string;
  label: string;
  active?: boolean;
  Component: any;
}
export const NavItem = ({ href, label, active, Component }: NavItemProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { toggle } = useNavDropDown();

  return (
    <HoverLabel asChild label={label} align="center">
      {href ? (
        <Link
          href={href}
          className={cn(
            "flex items-center gap-2  p-2 md:p-1 rounded-xl md:rounded-lg  hover:shadow-4xl hover:shadow-gray-300  transition ",
            active && "shadow-4xl shadow-gray-300"
          )}
        >
          <Component />
          {isDesktop && <p className="text-sm">{label}</p>}
        </Link>
      ) : (
        <div
          onClick={() => toggle()}
          className="flex items-center gap-2  p-2 md:p-1 rounded-full  cursor-pointer  hover:shadow-4xl hover:shadow-gray-300 transition "
        >
          <Component />
          {isDesktop && <p className="text-sm">{label}</p>}
        </div>
      )}
    </HoverLabel>
  );
};

export const NavItemSkeleton = () => {
  return (
    <>
      <div className="flex items-center gap-2   p-2 md:p-1 rounded-full ">
        <Skeleton className="h-6 w-6 rounded-full bg-gray-500" />
        <Skeleton className="hidden md:block h-2 w-12 rounded bg-gray-500" />
      </div>
    </>
  );
};
