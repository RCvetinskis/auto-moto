"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";
import { FilePen } from "lucide-react";
import DeletePost from "./actions/delete-post";
import { useRouter } from "next/navigation";
import { FullCarType } from "@/types";

type Props = {
  post: FullCarType;
  index: number;
};

const PostCard = ({ post, index }: Props) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isComment = !!post.comment;
  const image = post.images[0].url;
  const router = useRouter();

  const navigateEdit = () => {
    router.push(`/posts/${post.id}/editPost`);
  };

  const navigatePost = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div
      className="relative group  block p-2 h-full w-full"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-300  block  rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <Card className="flex flex-col md:flex-row relative z-20">
        <Image
          onClick={navigatePost}
          src={image || "/no_image.jpg"}
          alt="Post Image"
          width={300}
          height={300}
          className="aspect-square cursor-pointer  rounded my-3 md:my-0 hover:scale-95 transition-all opacity-0  duration-[2s] "
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
        />

        <div className="w-full space-y-4">
          <CardHeader onClick={navigatePost} className="cursor-pointer">
            <CardTitle>
              {post?.brand} <span>{post?.model}</span>
            </CardTitle>
            <CardTitle className="text-lg">Year {post.year} </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 text-neutral-500 text-sm">
              <div>
                <p>{post.engine}l</p>
                <p className="capitalize">{post.fuel}</p>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[100px] text-neutral-500 text-sm">
              {isComment ? (
                post.comment
              ) : (
                <div className=" space-y-1">
                  <p>{post.country}</p>
                  <p>{post.city}</p>
                  <p>{post.email}</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="font-bold">{post.price}$</CardFooter>
        </div>

        <div className="flex justify-end items-end p-4">
          <DeletePost title={post.brand + " " + post.model} postId={post.id} />

          <Button onClick={navigateEdit} variant={"ghost"}>
            <FilePen />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
