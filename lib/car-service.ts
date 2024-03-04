"use server";
import { revalidatePath } from "next/cache";
import db from "./db";
import { getCurrentUser } from "./user-service";

export const getCarsByUsername = async (
  username: string,
  page: number,
  postsPerPage: number
) => {
  if (!username) return null;

  const take = postsPerPage;
  const skip = (page - 1) * take;
  const cars = await db.car.findMany({
    where: {
      user: {
        username,
      },
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
      saved: true,
    },
    take,
    skip,
  });
  if (!cars) return null;

  const totalCount = await db.car.count({
    where: {
      user: {
        username,
      },
    },
  });

  return { data: cars, totalCount };
};

export const getCarById = async (id: string) => {
  const currentUser = await getCurrentUser();

  const car = await db.car.findUnique({
    where: {
      id,
      userId: currentUser?.id,
    },
    include: {
      audioVideoOptions: true,
      exteriorOptions: true,
      electronicOptions: true,
      safetySecurityOptions: true,
      otherOptions: true,
      interiorOptions: true,
      saved: true,
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
  if (!car) return null;
  return car;
};

export const getOtherSellerPosts = async (userId: string, carId?: string) => {
  const cars = await db.car.findMany({
    where: {
      userId,
      NOT: {
        id: carId,
      },
    },
    include: {
      images: true,
    },
  });
  if (!cars) return [];
  return cars;
};

export const getRecommendedPosts = async (
  brand: string,
  model: string,
  carId: string
) => {
  const cars = await db.car.findMany({
    where: {
      brand,
      model,
      NOT: {
        id: carId,
      },
    },
    include: {
      images: true,
      saved: true,
    },
  });
  if (!cars) return [];
  return cars;
};

export const getSortedCars = async (
  page: number,
  postsPerPage: number,
  query: string
) => {
  const take = postsPerPage;
  const skip = (page - 1) * take;

  let orderBy: any = { createdAt: "desc" };

  if (query === "deal") {
    // Fetch cars without sorting from Prisma
    let cars = await db.car.findMany({
      include: {
        saved: true,
        images: {
          orderBy: {
            position: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
      take,
      skip,
    });

    // Custom sorting logic based on the 'service' field
    const customServiceOrder = ["premium", "regular", "free"];
    cars = cars.sort((a, b) => {
      const indexA = customServiceOrder.indexOf(a.service || "");
      const indexB = customServiceOrder.indexOf(b.service || "");
      return indexA - indexB;
    });

    return cars;
  } else if (query === "new") {
    orderBy = { createdAt: "desc" };
  } else if (query === "cheap") {
    orderBy = {
      price: "asc",
    };
  } else if (query === "expensive") {
    orderBy = {
      price: "desc",
    };
  }

  // For other queries, use Prisma's orderBy
  const cars = await db.car.findMany({
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
      saved: true,
    },
    orderBy,

    take,
    skip,
  });

  if (!cars) return [];
  return cars;
};

export const getSavedCars = async (page: number, postsPerPage: number) => {
  try {
    const take = postsPerPage;
    const skip = (page - 1) * take;
    const currentUser = await getCurrentUser();

    if (!currentUser) return null;

    const savedEntries = await db.saved.findMany({
      where: {
        userId: currentUser?.id,
      },
    });

    if (!savedEntries) return null;

    const carIds = savedEntries
      .map((entry) => entry.carId)
      .filter((carId): carId is string => carId !== null);

    const savedCars = await db.car.findMany({
      where: {
        id: {
          in: carIds,
        },
        userId: currentUser?.id,
      },
      include: {
        images: {
          orderBy: {
            position: "asc",
          },
        },
        saved: true,
      },
      take,
      skip,
    });
    if (!savedCars || savedCars.length === 0) return null;

    const totalCount = await db.car.count({
      where: {
        id: {
          in: carIds,
        },
        userId: currentUser?.id,
      },
    });

    revalidatePath(`/user/${currentUser.username}/saved/posts`);
    return { data: savedCars, totalCount };
  } catch (error) {
    console.log("ERROR_ACTION getSavedCars", error);
    throw error;
  }
};
