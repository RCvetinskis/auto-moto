"use server";

import { utapi } from "@/lib/uploadthing";
import { imagesType } from "@/types";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
export const onUploadImages = async (formData: FormData) => {
  try {
    const images = formData.getAll("image");
    if (!images) throw new Error("Images not selected!");

    const uploadedFiles = await utapi.uploadFiles(images);
    if (!uploadedFiles || uploadedFiles.length === 0)
      throw new Error("Failed to upload images");

    const uploadedImages = uploadedFiles.map((file) => {
      return { url: file.data?.url, key: file.data?.key };
    });

    const uploadedImagesWithPosition = uploadedImages.map((image, index) => {
      return { ...image, position: index };
    });

    return uploadedImagesWithPosition;
  } catch (error) {
    console.log("ERROR_ACTION , onUploadImages", error);
    throw error;
  }
};

export const getImages = async (images: imagesType[]) => {
  try {
    if (images.length === 0) return null;
    const imagesKeys = images.map((image) => image.key);
    const existingImages = await utapi.getFileUrls(imagesKeys);
    if (!existingImages) return null;
    return existingImages;
  } catch (error) {
    console.log("ERROR_ACTION , getImages", error);
    throw error;
  }
};

export const onRemoveImages = async (key: string[] | string) => {
  try {
    if (!key) throw new Error("Images not selected!");

    const deletedFiles = await utapi.deleteFiles(key);
    if (!deletedFiles) throw new Error("Failed to upload images");

    const keyFilter: Prisma.StringFilter<"Images"> = Array.isArray(key)
      ? { in: key }
      : { equals: key };

    const images = await db.images.findMany({
      where: {
        key: keyFilter,
      },
    });

    if (images) {
      // Find the minimum position among remaining images
      const minPosition = Math.min(...images.map((img) => img.position));

      // Delete the images
      await db.images.deleteMany({
        where: {
          key: keyFilter,
        },
      });

      if (minPosition > 0) {
        await db.images.updateMany({
          where: {
            position: { gte: minPosition },
          },
          data: {
            position: {
              decrement: 1,
            },
          },
        });
      }

      return { message: "Successfully removed images!" };
    }
    return { message: "Succesfully removed images!" };
  } catch (error) {
    console.log("ERROR_ACTION , onUploadImages", error);
    throw error;
  }
};
