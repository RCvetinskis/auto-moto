"use client";

import { FullCarType } from "@/types";
import SmallCard from "../cards/small-card";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

type Props = {
  posts: FullCarType[];
};

const SmallPosts = ({ posts }: Props) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {posts.map((post, index) => (
          <CarouselItem
            key={post.id}
            className="cursor-pointer basis-1/2 md:basis-1/4 "
          >
            <Link
              href={`/posts/${post.id}`}
              className="relative group  block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-gray-200  block  rounded-xl"
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
              <SmallCard post={post} />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default SmallPosts;
