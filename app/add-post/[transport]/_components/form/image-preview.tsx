import { imagesType } from "@/types";
import { XCircle } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  images: imagesType[];
  onClear: (fileToRemove: string) => void;
  isPending: boolean;
}

export const ImagePreview = ({
  images,
  onClear,
  isPending,
}: ImagePreviewProps) => {
  return (
    <Carousel className="w-full max-w-[90%] mx-auto">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.key} className="basis-1/2 lg:basis-1/4  ">
            <div className="group relative">
              <Image
                alt="Car Image"
                className="aspect-square rounded-xl"
                src={image.url || "/no_image.jpg"}
                width={300}
                height={300}
              />
              {images.length > 0 && (
                <Button
                  onClick={() => onClear(image.key!)}
                  type="button"
                  disabled={isPending}
                  variant={"ghost"}
                >
                  <XCircle
                    className="absolute top-0 right-0 cursor-pointer text-gray-500"
                    size={20}
                  />
                </Button>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 3 && (
        <>
          <CarouselPrevious type="button" className="ml-3" />

          <CarouselNext type="button" className="mr-3" />
        </>
      )}
    </Carousel>
  );
};
