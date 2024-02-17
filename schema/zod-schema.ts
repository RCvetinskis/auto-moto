import {
  interiorList,
  exteriorList,
  electronicList,
  safetyList,
  audioList,
  otherOptionsList,
} from "@/lib/auto-data";

import * as z from "zod";

type InteriorPropertiesSchema = {
  [key in (typeof interiorList)[number]]: z.ZodAny;
};

const interiorProperties: InteriorPropertiesSchema = Object.fromEntries(
  interiorList.map((prop) => [prop, z.any()])
);
type ExteriorPropertiesSchema = {
  [key in (typeof interiorList)[number]]: z.ZodAny;
};

const exteriorProperties: ExteriorPropertiesSchema = Object.fromEntries(
  exteriorList.map((prop) => [prop, z.any()])
);
type ElectronicsPropertiesSchema = {
  [key in (typeof interiorList)[number]]: z.ZodAny;
};

const electronicsProperties: ElectronicsPropertiesSchema = Object.fromEntries(
  electronicList.map((prop) => [prop, z.any()])
);
type SafetyPropertiesSchema = {
  [key in (typeof interiorList)[number]]: z.ZodAny;
};

const safetyProperties: SafetyPropertiesSchema = Object.fromEntries(
  safetyList.map((prop) => [prop, z.any()])
);
type AudioPropertiesSchema = {
  [key in (typeof interiorList)[number]]: z.ZodAny;
};

const audioProperties: AudioPropertiesSchema = Object.fromEntries(
  audioList.map((prop) => [prop, z.any()])
);
type OtherOptionsPropertiesSchema = {
  [key in (typeof interiorList)[number]]: z.ZodAny;
};

const otherOptionsProperties: OtherOptionsPropertiesSchema = Object.fromEntries(
  otherOptionsList.map((prop) => [prop, z.any()])
);

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

  interiorOptions: z.object(interiorProperties),
  exteriorOptions: z.object(exteriorProperties),
  electronicOptions: z.object(electronicsProperties),
  safetySecurityOptions: z.object(safetyProperties),
  audioVideoOptions: z.object(audioProperties),
  otherOptions: z.object(otherOptionsProperties),
});
