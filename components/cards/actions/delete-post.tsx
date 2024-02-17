"use client";
import { onDeleteCar } from "@/actions/car-action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  postId: string;
  title: string;
};

const DeletePost = ({ postId, title }: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handleDelete = () => {
    startTransition(() => {
      onDeleteCar(postId)
        .then((res) => {
          toast.success(
            `Succesfully delete car: ${res.brand + " " + res.model}`
          );
          router.refresh();
          setOpen(false);
        })
        .catch((error) => toast.error(error.message));
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            You will perminantly remove this post, are you sure you want to
            delete?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button disabled={isPending} onClick={() => setOpen(!open)}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeletePost;
