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

export const onPostCar = async (
  data: any,
  images?: imagesType[],
  service?: string
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Unauthorized");

    const {
      required,
      optional,
      audioVideoOptions,
      electronicOptions,
      interiorOptions,
      otherOptions,
      safetySecurityOptions,
      exteriorOptions,
    } = data;

    if (!required) throw new Error("Required values are missing!");

    const newPost = await db.car.create({
      data: {
        userId: currentUser.id,
        ...required,
        ...optional,
        service: service ? service : "free",
        images: addImages(images),
        interiorOptions: createOptionsObject(interiorOptions),
        safetySecurityOptions: createOptionsObject(safetySecurityOptions),
        exteriorOptions: createOptionsObject(exteriorOptions),
        otherOptions: createOptionsObject(otherOptions),
        electronicOptions: createOptionsObject(electronicOptions),
        audioVideoOptions: createOptionsObject(audioVideoOptions),
      },
    });

    if (!newPost) throw new Error("Failed to create post!");

    return newPost;
  } catch (error) {
    console.log("ERROR_ACTION, onPostCar", error);
    throw error;
  }
};

export const removeExpiredCars = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    // Find cars older than 30 days
    const expiredCars = await db.car.findMany({
      where: {
        createdAt: { lt: thirtyDaysAgo },
      },
    });

    // Delete expired cars
    await db.car.deleteMany({
      where: {
        createdAt: { lt: thirtyDaysAgo },
      },
    });

    console.log(`${expiredCars.length} expired cars removed successfully.`);

    // Optionally, you can return the updated list of non-expired cars to the client
    const nonExpiredCars = await db.car.findMany();
    return nonExpiredCars;
  } catch (error) {
    console.error("Error removing expired cars:", error);
  }
};

export const onDeleteCar = async (id: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Unauthorized");

    const deletedCar = await db.car.delete({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    if (!deletedCar) throw new Error("Failed to delete car.");

    return deletedCar;
  } catch (error) {
    console.log(`Error_action OnDeleteCar`, error);
    throw error;
  }
};
