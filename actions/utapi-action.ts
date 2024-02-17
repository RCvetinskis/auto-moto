"use server";

import { utapi } from "@/lib/uploadthing";

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

    return uploadedImages;
  } catch (error) {
    console.log("ERROR_ACTION , onUploadImages", error);
    throw error;
  }
};

export const onRemoveImages = async (key: string[] | string) => {
  try {
    if (!key) throw new Error("Images not selected!");

    const deletedFiles = await utapi.deleteFiles(key);
    if (!deletedFiles) throw new Error("Failed to upload images");

    return { message: "Succesfully removed images!" };
  } catch (error) {
    console.log("ERROR_ACTION , onUploadImages", error);
    throw error;
  }
};
