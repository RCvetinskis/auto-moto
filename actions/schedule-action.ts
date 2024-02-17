import { removeExpiredCars } from "./car-action";

export const onStart = async () => {
  await removeExpiredCars();
};
