"use server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/user-service";
import { imagesType } from "@/types";
import { revalidatePath } from "next/cache";

const createOptionsObject = (options: any): any | undefined => {
  if (options && Object.values(options).some(Boolean)) {
    const hasTruthyValue = Object.values(options).some((value) =>
      Boolean(value)
    );
    if (hasTruthyValue) {
      return { create: { ...options } };
    }
  }
  return undefined;
};

const updateOptionsObject = (options: any): any | undefined => {
  if (options && Object.values(options).some(Boolean)) {
    const hasTruthyValue = Object.values(options).some((value) =>
      Boolean(value)
    );
    if (hasTruthyValue) {
      return { update: { ...options } };
    }
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
const updateCarImages = async (
  images: imagesType[] | undefined,
  carId: string
) => {
  const existsImageDb = await db.images.findFirst({ where: { carId } });

  if (!existsImageDb) {
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
export const onEditCar = async (
  id: string,
  data: any,
  images?: imagesType[]
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

    const updatedPost = await db.car.update({
      where: { id },
      data: {
        userId: currentUser.id,
        ...required,
        ...optional,
        images: await updateCarImages(images, id),
        interiorOptions: updateOptionsObject(interiorOptions),

        safetySecurityOptions: updateOptionsObject(safetySecurityOptions),

        exteriorOptions: updateOptionsObject(exteriorOptions),

        otherOptions: updateOptionsObject(otherOptions),

        electronicOptions: updateOptionsObject(electronicOptions),

        audioVideoOptions: updateOptionsObject(audioVideoOptions),
      },
    });

    if (!updatedPost) throw new Error("Failed to update post!");

    revalidatePath(`/posts/${updatedPost.id}/editPost`);
    return updatedPost;
  } catch (error) {
    console.log("ERROR_ACTION, onUpdateCar", error);
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

export const isCarAuthor = async (carId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return false;
  const car = await db.car.findUnique({
    where: {
      id: carId,
      userId: currentUser.id,
    },
  });
  if (!car) return false;
  return true;
};
