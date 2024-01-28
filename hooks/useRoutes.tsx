import { Bookmark, Heart, Home, LogIn, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";

const useRoutes = () => {
  const pathname = usePathname();

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
      active: pathname === "/add-post",
    },
    {
      href: "/saved/posts",
      label: "Saved Posts",
      active: pathname === "/saved-posts",
      Component: Heart,
    },
    {
      href: "/saved/searches",
      label: "Saved Searches",
      active: pathname === "/saved-searches",
      Component: Bookmark,
    },
    {
      href: "/sign-in",
      label: "Sign In",
      active: pathname === "/sign-in",
      Component: LogIn,
    },
  ];
  return routes;
};

export default useRoutes;
