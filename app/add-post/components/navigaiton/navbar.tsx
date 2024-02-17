"use client";
import { usePathname } from "next/navigation";
import { TransportSwitcher } from "./transport-switcher";
import { cn } from "@/lib/utils";
import { enumToArray } from "@/utils/enumToArray";
import { EnumTransport } from "@/enums";

export const NavBar = () => {
  const pathname = usePathname();

  const transports = enumToArray(EnumTransport);

  const isMainLayout = pathname.startsWith("/add-post");

  const routes = [
    {
      active: isMainLayout,
      label: "1. Post Information",
    },
    {
      active: pathname.includes("service"),
      label: "2. Choose Service",
    },
    {
      active: pathname.includes("service/payment"),
      label: "3. Payment",
    },
  ];

  const disableSwitcher = pathname.includes("service");
  return (
    <nav>
      <TransportSwitcher transports={transports} disabled={disableSwitcher} />

      <div className="bg-gray-500 rounded my-4 py-3 px-2 flex items-center justify-between text-sm md:text-base">
        {routes.map((route) => (
          <div
            key={route.label}
            className={cn("text-gray-400 ", route.active && "text-inherit")}
          >
            {route.label}
          </div>
        ))}
      </div>
    </nav>
  );
};
