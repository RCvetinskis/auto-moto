"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Images } from "@prisma/client";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  initialImages: Images[];
  current: number;
};
export const ImageCarousel = ({ initialImages, current, children }: Props) => {
  const [open, setOpen] = useState(false);
  const sortedImages = [...initialImages].sort((a, b) => {
    if (a.position === current) return -1;
    if (b.position === current) return 1;
    return a.position - b.position;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[1200px] h-screen border-none  flex items-center justify-center">
        <Carousel className=" max-w-[1000px] bg-black/95 w-full mx-auto">
          <CarouselContent>
            {sortedImages.map((image) => (
              <CarouselItem key={image.key} className="relative cursor-zoom-in">
                <TransformWrapper initialScale={1} panning={{ disabled: true }}>
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className=" absolute right-[20%] bottom-[25%] z-[45]">
                        <Button onClick={() => zoomIn()}>+</Button>
                        <Button onClick={() => zoomOut()}>-</Button>
                        <Button onClick={() => resetTransform()}>x</Button>
                      </div>
                      <TransformComponent>
                        <Image
                          src={image.url}
                          alt="post image"
                          width={1000}
                          height={1000}
                          className="aspect-square object-contain rounded-xl transition-opacity opacity-0  duration-[2s]"
                          onLoad={(e) =>
                            e.currentTarget.classList.remove("opacity-0")
                          }
                        />
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};
