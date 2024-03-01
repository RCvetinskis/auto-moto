import db from "./db";
import { getCurrentUser } from "./user-service";

export const getCarsByUsername = async (username: string) => {
  if (!username) return null;

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
    },
  });
  if (!cars) return null;
  return cars;
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
    },
  });
  if (!cars) return [];
  return cars;
};
