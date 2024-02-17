import { carFormSchema } from "@/schema/zod-schema";
import { FullCarType } from "@/types";
import { z } from "zod";

type CarFormSchemaType = z.infer<typeof carFormSchema>;

export const transformCurrentCarToDefaultValues = (
  currentCar: Partial<FullCarType>
): Partial<CarFormSchemaType> => {
  const defaultValues: any = {
    required: {},
    optional: {},
    interiorOptions: {},
    exteriorOptions: {},
    electronicsOptions: {},
    safetySecurityOptions: {},
    audioVideoOptions: {},
    otherOptions: {},
  };

  // Assign default values for required fields
  Object.keys(carFormSchema.shape.required.shape).forEach((key) => {
    defaultValues.required[key] = currentCar[key as keyof FullCarType] || "";
  });

  Object.keys(carFormSchema.shape.optional.shape).forEach((key) => {
    defaultValues.optional[key] = currentCar[key as keyof FullCarType] || null;
  });

  if (currentCar.interiorOptions) {
    Object.keys(carFormSchema.shape.interiorOptions.shape).forEach((key) => {
      defaultValues.interiorOptions[key] =
        // @ts-ignore
        currentCar.interiorOptions[key as keyof FullCarType] || null;
    });
  }

  if (currentCar.electronicsOptions) {
    Object.keys(carFormSchema.shape.electronicOptions.shape).forEach((key) => {
      defaultValues.electronicOptions[key] =
        // @ts-ignore
        currentCar.electronicOptions[key as keyof FullCarType] || null;
    });
  }
  if (currentCar.safetySecurityOptions) {
    Object.keys(carFormSchema.shape.safetySecurityOptions.shape).forEach(
      (key) => {
        defaultValues.safetySecurityOptions[key] =
          // @ts-ignore
          currentCar.safetySecurityOptions[key as keyof FullCarType] || null;
      }
    );
  }
  if (currentCar.otherOptions) {
    Object.keys(carFormSchema.shape.otherOptions.shape).forEach((key) => {
      defaultValues.otherOptions[key] =
        // @ts-ignore
        currentCar.otherOptions[key as keyof FullCarType] || null;
    });
  }
  if (currentCar.audioVideoOptions) {
    Object.keys(carFormSchema.shape.audioVideoOptions.shape).forEach((key) => {
      defaultValues.audioVideoOptions[key] =
        // @ts-ignore
        currentCar.audioVideoOptions[key as keyof FullCarType] || null;
    });
  }
  if (currentCar.exteriorOptions) {
    Object.keys(carFormSchema.shape.exteriorOptions.shape).forEach((key) => {
      defaultValues.exteriorOptions[key] =
        // @ts-ignore
        currentCar.exteriorOptions[key as keyof FullCarType] || null;
    });
  }

  return defaultValues;
};
