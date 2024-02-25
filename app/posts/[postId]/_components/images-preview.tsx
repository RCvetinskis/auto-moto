"use client";

import { ImageCarousel } from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Images } from "@prisma/client";
import { Maximize } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  images: Images[];
};

const ImagesPreview = ({ images }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  const handlePosition = (position: number) => {
    setCurrent((prev) => {
      if (prev === position) return prev;
      return position;
    });
  };

  return (
    <Card className="w-full border-none bg-black/95 space-y-4 p-4 ">
      <ImageCarousel initialImages={images} current={current}>
        <div className="w-full  h-[300px] md:h-[600px] mx-auto group relative ">
          <Image
            src={images[current].url}
            fill
            alt="post image"
            className="aspect-square rounded-xl object-cover  cursor-pointer transition-opacity opacity-0  duration-[2s]"
            onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
          />
          <Button className="hidden group-hover:block absolute  top-[45%] right-[45%]  ">
            <Maximize />
          </Button>
        </div>
      </ImageCarousel>

      <Carousel className="w-full max-w-[1000px] mx-auto">
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem
              key={image.key}
              className="cursor-pointer basis-1/4 md:basis-1/1"
            >
              <Image
                onClick={() => handlePosition(image.position)}
                src={image.url}
                alt="post image"
                width={200}
                height={200}
                className={cn(
                  "aspect-square rounded-xl transition-opacity duration-[2s]",
                  image.key === images[current].key && "border border-white"
                )}
                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </Card>
  );
};

export default ImagesPreview;
