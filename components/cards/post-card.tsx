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
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import {
  CalendarCheck2,
  Car,
  Cog,
  Fuel,
  Heart,
  MapPin,
  Milestone,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { FullCarType } from "@/types";
import CreatorActions from "./creator-actions";
import { isCarAuthor } from "@/actions/car-action";

type Props = {
  post: FullCarType;
  index: number;
};

const PostCard = ({ post, index }: Props) => {
  const [isAuthor, setIsAuthor] = useState(false);
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const image = post.images.length > 0 ? post.images[0].url : null;
  const router = useRouter();

  const navigatePost = () => {
    router.push(`/posts/${post.id}`);
  };

  // TODO: Pagination
  // TODO:Save functionality
  const handleSavePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    isCarAuthor(post.id)
      .then((res) => setIsAuthor(res))
      .catch((e) => console.log(e));
  }, [post]);

  return (
    <div
      className="relative group  block p-2 h-full w-full"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-gray-300  block  rounded-xl"
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
      <Card
        onClick={navigatePost}
        className="flex flex-col md:flex-row relative z-20 cursor-pointer "
      >
        <div className="absolute z-50 bottom-0 right-0 flex items-center">
          <Button onClick={handleSavePost} variant={"ghost"}>
            <Heart fill="#000" />
          </Button>
          {isAuthor && <CreatorActions post={post} />}
        </div>

        <div className="w-full lg:w-1/2 h-[300px] group relative -mt-4 md:-mt-0">
          <Image
            src={image || "/no_image.jpg"}
            alt="Post Image"
            fill
            className="aspect-square object-cover  rounded my-3 md:my-0  transition-all opacity-0  duration-[2s] "
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />
        </div>

        <div className="w-full space-y-4">
          <CardHeader>
            <CardTitle>
              {post?.brand} <span>{post?.model}</span>
            </CardTitle>
            <CardTitle className="text-lg">Year {post.year} </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 ">
              <div className="flex gap-2">
                <CalendarCheck2 size={34} />
                <div>
                  <p>Year</p>
                  <p className="font-bold text-sm">
                    {post.year} - <span>{post.month}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Fuel size={34} />
                <div>
                  <p>Fuel Type</p>
                  <p className="font-bold text-sm capitalize">{post.fuel}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Milestone size={34} />
                <div>
                  <p>Mileage </p>
                  <p className="font-bold text-sm capitalize">{post.mileage}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Cog size={34} />
                <div>
                  <p>Gear Box </p>
                  <p className="font-bold text-sm capitalize">{post.gearbox}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Car size={34} />
                <div>
                  <p>Engine </p>
                  <p className="font-bold text-sm capitalize">
                    {post.engine}l <span>{post.kW}kW</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={34} />
                <div>
                  <p className="font-bold text-sm capitalize">
                    {post.country} <span>{post.city}</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="font-bold">{post.price}$</CardFooter>
        </div>
      </Card>
    </div>
  );
};

export default PostCard;
