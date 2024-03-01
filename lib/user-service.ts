"use server";
import { auth } from "@clerk/nextjs";
import db from "./db";
export const getCurrentUser = async () => {
  const { userId } = auth();

  if (!userId) return null;

  const currentUser = await db.user.findUnique({
    where: {
      externalUserId: userId,
    },
  });

  if (!currentUser) return null;
  return currentUser;
};

export const getUserByUsername = async (username: string) => {
  if (!username) return null;

  const user = await db.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) return null;
  return user;
};
