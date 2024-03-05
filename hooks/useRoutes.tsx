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
    : {
        label: "Saved Posts",
        href: "/sign-in",
        Component: Heart,
      };
  const savedSearchesRoute = isSignedIn
    ? {
        label: "Saved Searches",
        href: `/user/${user.username}/saved/searches`,
        active: pathname === `/user/${user.username}/saved/searches`,
        Component: Bookmark,
      }
    : {
        label: "Saved Searches",
        href: "/sign-in",
        Component: Bookmark,
      };

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
    savedSearchesRoute,
    authRoute,
  ];

  return routes;
};

export default useRoutes;
