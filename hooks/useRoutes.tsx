"use client";
import { Bookmark, Heart, Home, LogIn, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavUserBtn } from "@/components/navigation/user/nav-user-btn";
import { useUser } from "@clerk/nextjs";

const useRoutes = () => {
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();

  const authRoute = isSignedIn
    ? {
        label: user.username?.charAt(0).toUpperCase() + user.username!.slice(1),

        Component: NavUserBtn,
      }
    : {
        href: "/sign-in",
        label: "Sign In",
        active: pathname === "/sign-in",
        Component: LogIn,
      };
  const savedPostsRoute = isSignedIn
    ? {
        label: "Saved Posts",
        href: `/user/${user.username}/saved/posts`,
        active: pathname === `/user/${user.username}/saved/posts`,
        Component: Heart,
      }
    : null;
  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      Component: Home,
    },
    {
      href: "/add-post",
      label: "Add Post",
      Component: PlusCircle,
      active: pathname.includes("/add-post"),
    },
    savedPostsRoute,
    {
      href: "/saved/searches",
      label: "Saved Searches",
      active: pathname === "/saved-searches",
      Component: Bookmark,
    },
    authRoute,
  ];

  return routes;
};

export default useRoutes;
