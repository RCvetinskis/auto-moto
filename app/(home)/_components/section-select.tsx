"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const navItems = [
  {
    option: "deal",
    value: "Best Deal",
  },
  {
    option: "new",
    value: "Newest",
  },

  {
    option: "popular",
    value: "Most Popular",
  },
  {
    option: "expensive",
    value: "Most Expensive",
  },
  {
    option: "cheap",
    value: "Cheapest",
  },
];
const SectionSelect = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSection = searchParams.get("section") || "deal";
  const router = useRouter();

  const navigateToPage = (section: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", section);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="my-4 ">
      <ul className="flex flex-wrap gap-3 justify-between items-center w-full">
        {navItems.map((item) => (
          <li className="flex-1 w-full" key={item.option}>
            <Button
              onClick={() => navigateToPage(item.option)}
              variant={"outline"}
              size={"lg"}
              className={cn(
                "!w-full",
                currentSection === item.option && "shadow-lg shadow-black"
              )}
            >
              {item.value}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionSelect;
