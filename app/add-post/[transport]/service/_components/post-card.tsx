"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePost } from "@/store/store";

export const PostCard = () => {
  const { post } = usePost();
  const image = post.images[0];

  const isComment = !!post.data?.optional.comment;

  return (
    <Card className="flex items-center flex-col md:flex-row md:gap-5">
      <Image
        src={image.url || "/no_image.jpg"}
        alt="Post Image"
        width={300}
        height={300}
        className="aspect-square rounded my-3 md:my-0"
      />
      <div className="w-full space-y-4">
        <CardHeader>
          <CardTitle>
            {post.data?.required.brand} <span>{post.data?.required.model}</span>
          </CardTitle>
          <CardTitle className="text-lg">
            Year {post.data?.required.year}{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 text-neutral-500 text-sm">
            <div>
              <p>{post.data?.required.engine}l</p>
              <p className="capitalize">{post.data?.required.fuel}</p>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[100px] text-neutral-500 text-sm">
            {isComment ? (
              post.data?.optional.comment
            ) : (
              <div className="flex gap-3 items-center">
                <p>{post.data?.required.country}</p>
                <p>{post.data?.required.city}</p>
                <p>{post.data?.required.email}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="font-bold">
          {post.data?.required.price}$
        </CardFooter>
      </div>
    </Card>
  );
};

export const PostCardSkeleton = () => {
  return (
    <Card className="flex items-center flex-col md:flex-row md:gap-5">
      <Skeleton className="w-[300px] h-[300px] aspect-square rounded my-3 md:my-0 bg-gray-500" />

      <div className="w-full space-y-4">
        <CardHeader>
          <CardTitle>
            <Skeleton className=" w-[150px] h-[30px] bg-gray-500" />
          </CardTitle>
          <CardTitle className="text-lg">
            <Skeleton className=" w-[100px] h-[20px] bg-gray-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 text-neutral-500 text-sm">
            <div>
              <Skeleton className=" w-[100px] h-[20px] bg-gray-500" />
              <Skeleton className=" w-[100px] h-[20px] bg-gray-500" />
            </div>
          </div>
          <div className="overflow-y-auto max-h-[100px] text-neutral-500 text-sm">
            <Skeleton className=" w-[300px] h-[100px] bg-gray-500" />
          </div>
        </CardContent>
        <CardFooter className="font-bold">
          <Skeleton className=" w-[100px] h-[20px] bg-gray-500" />
        </CardFooter>
      </div>
    </Card>
  );
};
