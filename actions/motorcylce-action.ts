"use server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/user-service";
import { imagesType } from "@/types";

const createOptionsObject = (options: any): any | undefined => {
  if (options && Object.values(options).some(Boolean)) {
    return { create: { ...options } };
  }
  return undefined;
};

const addImages = (images: imagesType[] | undefined) => {
  if (images) {
    return {
      create: images,
    };
  }
  return undefined;
};

export const onPostMotorcycle = async (
  data: any,
  images?: imagesType[],
  service?: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Unauthorized");

    const { required, optional, features } = data;

    if (!required) throw new Error("Required values are missing!");

    const newPost = await db.motorcyle.create({
      data: {
        userId: currentUser.id,
        ...required,
        ...optional,
        service: service ? service : "free",
        images: addImages(images),
        features: createOptionsObject(features),
      },
    });

    if (!newPost) throw new Error("Failed to create post!");

    return newPost;
  } catch (error) {
    console.log("ERROR_ACTION, onPostMotorcycle", error);
    throw error;
  }
};
