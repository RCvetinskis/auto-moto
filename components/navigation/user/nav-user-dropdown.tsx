"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { INavUserBtn } from "@/types";
import { useNavDropDown } from "@/store/store";
import { NavUserDropDownItem } from "./nav-user.dropdown-item";
import { CurrentUserAvatar } from "@/components/user/avatar/current-user-avatar";

interface NavUserDropDownProps {
  routes: INavUserBtn[];
}

export const NavUserDropDown = ({ routes }: NavUserDropDownProps) => {
  const { toggle, isOpen } = useNavDropDown();
  return (
    <DropdownMenu open={isOpen} onOpenChange={toggle}>
      <DropdownMenuTrigger className="outline-none">
        <CurrentUserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="p-2">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {routes.map((route) => (
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-100 transition"
            key={route.label}
          >
            <NavUserDropDownItem item={route} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
