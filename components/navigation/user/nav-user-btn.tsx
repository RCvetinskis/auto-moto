"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { Bookmark, LogOut, MessageCircleMore, UserCog } from "lucide-react";
import { useMemo } from "react";
import { NavUserDropDown } from "./nav-user-dropdown";
import { usePathname } from "next/navigation";

export const NavUserBtn = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const pathname = usePathname();

  const routes = [
    {
      href: `/user/${user?.username}/posts`,
      active: pathname === `/user/${user?.username}/posts`,
      label: "My Posts",
      Icon: Bookmark,
    },
    {
      href: `/user/${user?.username}/conversations`,
      active: pathname === `/user/${user?.username}/conversations`,
      label: "Conversations",
      Icon: MessageCircleMore,
    },
    {
      href: `/user/${user?.username}/settings`,
      active: pathname === `/user/${user?.username}/settings`,
      label: "Account Settings",
      Icon: UserCog,
    },
    {
      label: "Log Out",
      Icon: LogOut,
      onClick: () => {
        signOut();
      },
    },
  ];

  return <NavUserDropDown routes={routes} />;
};
