import { z } from "zod";
import { carFormSchema, motorcycleFormSchema } from "./schema/zod-schema";
import {
  AudioVideoOptions,
  Car,
  ElectronicsOptions,
  ExteriorOptions,
  Images,
  InteriorOptions,
  OtherOptions,
  SafetySecurityOptions,
  Saved,
} from "@prisma/client";

export interface INavUserBtn {
  href?: string;
  active?: boolean;
  label: string;
  Icon?: any;
  onClick?: () => void;
}

export type CarBrandApi = {
  brand: string;
};

export type imagesType = {
  key: string;
  url: string;
  position: number;
};

export type PostType = {
  type: "car" | "motorcycle" | null;
  data:
    | z.infer<typeof carFormSchema>
    | z.infer<typeof motorcycleFormSchema>
    | null;

  images: imagesType[];
};

export type ServiceDataType = {
  adPlacement: string | null;
  adHighlight: string | null;
  adTime: string;
  discount: string | null;
  initialPrice: string | null;
  price: string | null;
};

export type ServiceDataOptionsType = {
  service: string;
  options: Partial<ServiceDataType>[];
};

export type FullCarType = Car & {
  interiorOptions?: InteriorOptions | null;
  exteriorOptions?: ExteriorOptions | null;
  electronicsOptions?: ElectronicsOptions | null;
  safetySecurityOptions?: SafetySecurityOptions | null;
  audioVideoOptions?: AudioVideoOptions | null;
  otherOptions?: OtherOptions | null;
  images: Images[];
  saved?: Saved[];
};

export type TransportColor = {
  name: string;
  hexCode: string;
};
