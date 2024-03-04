"use server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/user-service";
import { revalidatePath } from "next/cache";

export const onSave = async (carId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Unauthorized");

    const car = await db.car.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) throw new Error("Post not found!");

    const wasSaved = await db.saved.findFirst({
      where: {
        carId,
        userId: currentUser.id,
      },
    });
    if (wasSaved) {
      await db.saved.delete({
        where: {
          carId,
          userId: currentUser.id,
          id: wasSaved.id,
        },
      });
      revalidatePath(`/`);
      revalidatePath(`/posts`);
      return {
        message: `"Succesfully removed post"${(car.brand, car.model)}`,
        saved: false,
      };
    }
    const savedPost = await db.saved.create({
      data: {
        carId,
        userId: currentUser.id,
      },
    });
    if (!savedPost) throw new Error("Failed to save post!");

    revalidatePath(`/`);
    revalidatePath(`/posts`);
    revalidatePath(`/user/${currentUser.username}/saved/posts`);
    return {
      message: `"Succesfully saved post"${(car.brand, car.model)}`,
      saved: true,
    };
  } catch (error) {
    console.log("ERROR_ACTION onSave");
    throw error;
  }
};
