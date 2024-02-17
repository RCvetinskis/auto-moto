"use client";

import { usePost } from "@/store/store";
import { useRouter } from "next/navigation";

export const RedirectBack = () => {
  const { post } = usePost();
  const router = useRouter();
  if (!post.data) {
    router.push("/add-post");
  }
  return null;
};
