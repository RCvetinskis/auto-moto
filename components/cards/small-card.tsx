"use client";
import { FullCarType } from "@/types";
import { Card, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";

type Props = {
  post: FullCarType;
};

const SmallCard = ({ post }: Props) => {
  return (
    <Card className="cursor-pointer  relative z-20   transition-all ">
      <div className="w-full  h-[200px] group relative ">
        <Image
          src={post.images[0].url || "/no_image.jpg"}
          fill
          alt="post image"
          className="aspect-square rounded-t  object-cover  transition-opacity opacity-0  duration-[2s]"
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
        />
      </div>
      <CardHeader>
        <CardTitle>
          {post.brand} {post.model}
        </CardTitle>
        <p className="font-bold">{post.price}$</p>
      </CardHeader>
    </Card>
  );
};

export default SmallCard;
