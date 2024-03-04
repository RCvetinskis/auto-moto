"use server";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/user-service";
import { Images } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const onImagesReorder = async (images: Images[]) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("Unauthorized");

    const updatePromises = images.map((image) => {
      return db.images.update({
        where: { id: image.id },
        data: { position: image.position },
      });
    });

    revalidatePath(`/posts`);
    revalidatePath(`/user/${currentUser.username}/posts`);

    await Promise.all(updatePromises);

    return { message: "Images reordered successfully" };
  } catch (error) {
    console.log("ERROR_ACTION onImagesReorder");
    throw error;
  }
};
