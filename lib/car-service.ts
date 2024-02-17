import db from "./db";

export const getCarsByUsername = async (username: string) => {
  if (!username) return null;

  const cars = await db.car.findMany({
    where: {
      user: {
        username,
      },
    },
  });
  if (!cars) return null;
  return cars;
};

export const getCarById = async (id: string) => {
  const car = await db.car.findUnique({
    where: {
      id,
    },
    include: {
      audioVideoOptions: true,
      interiorOptions: true,
    },
  });
  if (!car) return null;
  return car;
};
