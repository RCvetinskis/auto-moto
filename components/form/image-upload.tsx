"use client";
import { Input } from "@/components/ui/input";

import { useRef, useTransition } from "react";
import { ImagePreview } from "./image-preview";
import { XCircle } from "lucide-react";
import { onRemoveImages, onUploadImages } from "@/actions/utapi-action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import ImageShuffler from "../image-shuffle";
import { Images } from "@prisma/client";

interface ImageUploadProps {
  images: Images[];
  setImages: React.Dispatch<React.SetStateAction<Images[]>>;
}
export const ImageUpload = ({ images, setImages }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files || null;
    if (selectedFiles) {
      if (selectedFiles.length >= 11) {
        toast.error("Max 10 images can be uploaded");
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        return;
      }
      const formData = new FormData();
      const imagesArr = Array.from(selectedFiles).map((file) => file);
      for (const image of imagesArr) {
        formData.append("image", image);
      }

      if (imagesArr.length === 0) return toast.error("Images not selected!");
      startTransition(() => {
        onUploadImages(formData)
          .then((res) => {
            setImages(res as Images[]);
          })
          .catch((error) => toast.error(error.message));
      });
    }
  };

  const clearImage = (key: string) => {
    startTransition(() => {
      onRemoveImages(key)
        .then((res) => {
          setImages((prevFile) =>
            prevFile.filter((image) => image.key !== key)
          );
          toast.success(res.message);
        })
        .catch((error) => toast.error(error.message));
    });
  };
  const clearAll = () => {
    const keys = images.map((image) => image.key);
    if (!keys || keys.length === 0) return;
    startTransition(() => {
      onRemoveImages(keys)
        .then((res) => {
          setImages([]);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
          toast.success(res.message);
        })
        .catch((error) => toast.error(error.message));
    });
  };

  return (
    <div>
      {isPending ? (
        <Spinner />
      ) : (
        <div
          className={`my-4 transition-all w-full  duration-300 ease-in-out ${
            images.length > 0 ? "max-h-screen p-4" : "max-h-0 p-0 "
          } overflow-hidden`}
        >
          <ImagePreview
            isPending={isPending}
            images={images}
            onClear={clearImage}
          />
          <ImageShuffler images={images} setImages={setImages} />
        </div>
      )}

      <div className="group relative">
        <Input
          disabled={isPending}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          ref={inputRef}
        />
        {images.length > 0 && (
          <Button
            type="button"
            disabled={isPending}
            variant={"ghost"}
            onClick={clearAll}
          >
            <XCircle
              className="absolute top-2 right-2 cursor-pointer"
              size={20}
            />
          </Button>
        )}
      </div>
    </div>
  );
};
