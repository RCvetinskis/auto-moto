"use client";
import { Car, LucideBike } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CarSearchForm } from "./form/car-search-form";
import { MotoSearchForm } from "./form/moto-search-form";

type Props = {
  data: string[];
};
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

const Search = ({ data }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTransport = searchParams.get("transport") || "car";
  const router = useRouter();

  const handleSwitch = (section: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("transport", section);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6  bg-white p-4 rounded max-w-[600px] w-full">
      <h1 className="text-2xl font-bold italic capitalize">
        {currentTransport}
      </h1>

      <nav>
        <ul className="flex flex-wrap gap-3 justify-between items-center w-full">
          {navItems.map((item) => (
            <li className="flex-1 w-full" key={item.option}>
              <Button
                onClick={() => handleSwitch(item.option)}
                variant={"outline"}
                size={"lg"}
                className={cn(
                  "!w-full flex flex-col font-bold ",
                  currentTransport === item.option && "shadow-lg shadow-black"
                )}
              >
                <item.Component />
                {item.value}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {currentTransport === "car" ? (
        <CarSearchForm currentTransport={currentTransport} data={data} />
      ) : (
        <MotoSearchForm currentTransport={currentTransport} data={data} />
      )}
    </div>
  );
};

export default Search;
