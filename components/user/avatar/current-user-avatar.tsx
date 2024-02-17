"use client";

import { UserAvatar } from "./user-avatar";
import { useUser } from "@clerk/nextjs";

export const CurrentUserAvatar = () => {
  const { user } = useUser();
  return <UserAvatar image={user?.imageUrl!} />;
};
