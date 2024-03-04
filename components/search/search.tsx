"use client";

import { Car, LucideBike } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import InputSelect from "../input-select";
import { useEffect, useState } from "react";
import FirstRow from "./form/first-row";
import { SearchForm } from "./form";

const navItems = [
  {
    option: "car",
    value: "Cars",
    Component: Car,
  },
  {
    option: "moto",
    value: "Motorcycles",
    Component: LucideBike,
  },
];

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTransport = searchParams.get("transport") || "car";
  const router = useRouter();

  const navigateToPage = (section: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("transport", section);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-8 bg-white p-4 rounded">
      <h1 className="text-2xl font-bold italic capitalize">
        {currentTransport}
      </h1>
      <nav>
        <ul>
          <nav className="my-4 ">
            <ul className="flex flex-wrap gap-3 justify-between items-center w-full">
              {navItems.map((item) => (
                <li className="flex-1 w-full" key={item.option}>
                  <Button
                    onClick={() => navigateToPage(item.option)}
                    variant={"outline"}
                    size={"lg"}
                    className={cn(
                      "!w-full flex flex-col font-bold ",
                      currentTransport === item.option &&
                        "shadow-lg shadow-black"
                    )}
                  >
                    <item.Component />
                    {item.value}
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </ul>
      </nav>
      <div>
        <SearchForm currentTransport={currentTransport} />
      </div>
    </div>
  );
};

export default Search;
