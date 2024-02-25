"use client";
import Image from "next/image";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { imagesType } from "@/types";

type Props = {
  images: imagesType[];
  setImages: React.Dispatch<React.SetStateAction<imagesType[]>>;
};
const ImageShuffler = ({ images, setImages }: Props) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const reorderedImages = [...images];
    const [removed] = reorderedImages.splice(startIndex, 1);
    reorderedImages.splice(endIndex, 0, removed);

    const updatedImages = reorderedImages.map((image, index) => {
      return { ...image, position: index };
    });

    setImages(updatedImages);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Reorder Images</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Reorder Images
          </DialogTitle>
        </DialogHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-list" direction="horizontal">
            {(provided) => (
              <div
                className="grid grid-cols-2 md:grid-cols-4 gap-3 overflow-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image.key}
                    draggableId={image.key}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-fit h-fit bg-gray-200 rounded p-0"
                      >
                        <Image
                          alt="image"
                          src={image.url || "/no_image.jpg"}
                          width={250}
                          height={250}
                          className="aspect-square  rounded transition-opacity opacity-0  duration-[2s]"
                          onLoadingComplete={(image) =>
                            image.classList.remove("opacity-0")
                          }
                        />
                        <p className="text-center font-bold">{index + 1}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
    </Dialog>
  );
};

export default ImageShuffler;
