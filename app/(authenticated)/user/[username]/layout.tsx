import db from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { username: string };
};
const Layout = async ({ params, children }: Props) => {
  const userExists = await db.user.findUnique({
    where: {
      username: params.username,
    },
  });

  if (!userExists) return redirect("/");
  return <div>{children}</div>;
};

export default Layout;
