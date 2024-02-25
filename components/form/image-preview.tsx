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
import { Spinner } from "../spinner";

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
        {images
          .sort((a, b) => a.position - b.position)
          .map((image) => (
            <CarouselItem key={image.key} className="basis-1/2 lg:basis-1/4  ">
              <div className="group relative roundex-xl w-fit h-fit bg-gray-200 spin-in-0">
                <Image
                  alt="Car Image"
                  src={image.url || "/no_image.jpg"}
                  width={300}
                  height={300}
                  className="aspect-square  rounded-xl transition-opacity opacity-0 duration-[2s]"
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
                {images.length > 0 && (
                  <Button
                    onClick={() => onClear(image.key!)}
                    type="button"
                    disabled={isPending}
                    variant={"ghost"}
                    className="absolute top-0 right-0 cursor-pointer text-gray-500"
                  >
                    <XCircle size={20} />
                  </Button>
                )}
                <p className="text-center font-bold">{image.position + 1}</p>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>

      <CarouselPrevious type="button" className="ml-3" />

      <CarouselNext type="button" className="mr-3" />
    </Carousel>
  );
};
