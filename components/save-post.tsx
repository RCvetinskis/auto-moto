"use client";

import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { FullCarType } from "@/types";
import { useState, useTransition } from "react";
import { onSave } from "@/actions/save-action";
import { toast } from "sonner";

type Props = {
  post: FullCarType;
};

const SavePost = ({ post }: Props) => {
  const isSaved = post.saved?.find((x) => x.carId === post.id);

  const [saved, setSaved] = useState(!!isSaved);
  const [isPending, startTranstion] = useTransition();
  const handleSavePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    startTranstion(() => {
      onSave(post.id)
        .then((res) => {
          toast.success(res.message);
          setSaved(res.saved);
        })
        .catch((e) => toast.error(e.message));
    });
  };
  return (
    <Button disabled={isPending} onClick={handleSavePost} variant={"ghost"}>
      <Heart fill={saved ? "#000" : "#fff"} />
    </Button>
  );
};

export default SavePost;
