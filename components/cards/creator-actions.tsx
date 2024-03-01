"use client";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import DeletePostModal from "../modals/delete-post-modal";
import { FullCarType } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  post: FullCarType;
};

const CreatorActions = ({ post }: Props) => {
  const router = useRouter();
  const handleEditPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/posts/${post.id}/editPost`);
  };
  return (
    <>
      <Button onClick={handleEditPost} variant={"ghost"}>
        <Edit />
      </Button>
      <span onClick={(e) => e.stopPropagation()}>
        <DeletePostModal
          postId={post.id}
          title={`${post.brand} ${post.model}`}
          variant="ghost"
          size="default"
        />
      </span>
    </>
  );
};

export default CreatorActions;
