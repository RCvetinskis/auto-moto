import {
  interiorList,
  exteriorList,
  electronicList,
  safetyList,
  audioList,
  otherOptionsList,
  motorcycleFeatures,
} from "@/lib/auto-data";

import * as z from "zod";
function createPropertiesSchema(propertyList: any[]) {
  const propertiesSchema = {} as any;
  propertyList.map((prop) => {
    propertiesSchema[prop.key] = z.any();
  });
  return propertiesSchema;
}

const interiorProperties = createPropertiesSchema(interiorList);

const exteriorProperties = createPropertiesSchema(exteriorList);

const electronicsProperties = createPropertiesSchema(electronicList);

const safetyProperties = createPropertiesSchema(safetyList);

const audioProperties = createPropertiesSchema(audioList);
const otherOptionsProperties = createPropertiesSchema(otherOptionsList);

// motos options
type MotorcycleFeaturesSchema = {
  [key in (typeof motorcycleFeatures)[number]["key"]]: z.ZodAny;
};
const motorcycleFeaturesProperties: MotorcycleFeaturesSchema = {};
motorcycleFeatures.forEach((prop) => {
  motorcycleFeaturesProperties[prop.key] = z.any();
});

export const carFormSchema = z.object({
  required: z.object({
    brand: z.string(),
    model: z.string(),
    gearbox: z.string(),
    year: z.number(),
    month: z.number(),
    fuel: z.string(),
    body: z.string(),
    doors: z.string(),
    engine: z.string().min(3, {
      message: "Provide the engine correctly, for example: 2.0",
    }),
    wheelSide: z.string(),
    defects: z.string(),
    mileage: z.coerce.number().positive().int(),
    country: z.string(),
    city: z.string(),
    phone: z.string().min(8, {
      message: "Provide valid number: +37060000",
    }),
    price: z.coerce.number().positive().int(),
    email: z.string().email({
      message: "Invalid email",
    }),
  }),

  optional: z.object({
    TA_year: z.coerce.number().optional(),
    TA_month: z.coerce.number().optional(),
    engine_modification: z.string().optional(),
    kW: z.coerce.number().optional(),
    drive: z.string().optional(),
    weight: z.coerce.number().optional(),
    gears: z.coerce.number().optional(),
    cilinders: z.coerce.number().optional(),
    wheelSize: z.coerce.string().optional(),
    comment: z.coerce.string().optional(),
  }),

  interiorOptions: z.object(interiorProperties).optional(),
  exteriorOptions: z.object(exteriorProperties).optional(),
  electronicsOptions: z.object(electronicsProperties).optional(),
  safetySecurityOptions: z.object(safetyProperties).optional(),
  audioVideoOptions: z.object(audioProperties).optional(),
  otherOptions: z.object(otherOptionsProperties).optional(),
});

export const motorcycleFormSchema = z.object({
  required: z.object({
    condition: z.string(),
    motorcycleType: z.string(),
    brand: z.string(),
    model: z.string(),
    year: z.number(),
    month: z.number(),

    cc: z.coerce.number().min(3, {
      message: "Provide the engine capacity, for example: 600",
    }),
    defects: z.string(),
    mileage: z.coerce.number().positive().int(),
    country: z.string(),
    city: z.string(),
    phone: z.string().min(8, {
      message: "Provide valid number: +37060000",
    }),
    price: z.coerce.number().positive().int(),
    email: z.string().email({
      message: "Invalid email",
    }),
  }),
  optional: z.object({
    TA_year: z.coerce.number().optional(),
    TA_month: z.coerce.number().optional(),
    kW: z.coerce.number().optional(),
    weight: z.coerce.number().optional(),
    gears: z.coerce.number().optional(),
    cilinders: z.coerce.number().optional(),
    comment: z.coerce.string().optional(),
    cooling: z.coerce.string().optional(),
    fuel: z.coerce.string().optional(),
  }),
  features: z.object(motorcycleFeaturesProperties).optional(),
});
