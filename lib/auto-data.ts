import {
  enumToArray as enumToArray,
  enumToArrayObject,
} from "@/utils/enumToArray";
import {
  generateMonths,
  generateTaYears,
  generateYearsArray,
} from "@/utils/generateDates";
import { generateWheelSizes } from "@/utils/generateWheelSizes";
import {
  BodyType,
  Condition,
  Cooling,
  Defects,
  FuelType,
  GearBox,
  MotoFuel,
  MotorcyleType,
} from "@prisma/client";
import {
  InteriorOption,
  ExteriorOption,
  ElectronicsOption,
  SafetySecurityOption,
  AudioVideoOption,
  OtherOption,
  MotoFeatures,
} from "@/enums";
import { TransportColor } from "@/types";

export const CLIENT_URL = "https://long-rings-switch.loca.lt";
export const gears = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const cilinders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const wheelSizes = generateWheelSizes();

export const gearBoxList = enumToArray(GearBox);
export const yearsList = generateYearsArray();
export const monthsList = generateMonths();
export const TAYearsList = generateTaYears();
export const fuelList = enumToArray(FuelType);
export const bodyList = enumToArray(BodyType);
export const doorsList = ["2/3", "4/5", "6/7"];
export const wheelSideList = ["left", "right"];
export const defectsList = enumToArray(Defects);
export const driveTypeList = ["Front Wheel Drive", "Rear wheel Drive", "4x4"];
export const exteriorList = enumToArrayObject(ExteriorOption);
export const interiorList = enumToArrayObject(InteriorOption);
export const electronicList = enumToArrayObject(ElectronicsOption);
export const safetyList = enumToArrayObject(SafetySecurityOption);
export const audioList = enumToArrayObject(AudioVideoOption);
export const otherOptionsList = enumToArrayObject(OtherOption);

// motorcycle
export const condition = enumToArray(Condition);
export const motorCycleType = enumToArray(MotorcyleType);
export const cooling = enumToArray(Cooling);
export const motoFuel = enumToArray(MotoFuel);
export const motorcycleFeatures = enumToArrayObject(MotoFeatures) as {
  key: string;
  value: string;
}[];

// Eastern European countries
const easternEuropeanCountries = [
  "Lithuania",
  "Latvia",
  "Poland",
  "Estonia",
  "Belarus",
  "Ukraine",
  "Albania",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Czech Republic",
  "Hungary",
  "Moldova",
  "Montenegro",
  "North Macedonia",
  "Romania",
  "Russia",
  "Serbia",
  "Slovakia",
  "Slovenia",
];

const scandinavianCountries = [
  "Denmark",
  "Finland",
  "Iceland",
  "Norway",
  "Sweden",
];

export const countriesList = [
  ...easternEuropeanCountries,
  ...scandinavianCountries,
  "Germany",
  "France",
  "England",
];

export const transportColors: TransportColor[] = [
  { name: "Black", hexCode: "#000000" },
  { name: "White", hexCode: "#FFFFFF" },
  { name: "Silver", hexCode: "#C0C0C0" },
  { name: "Gray", hexCode: "#808080" },
  { name: "Red", hexCode: "#FF0000" },
  { name: "Blue", hexCode: "#0000FF" },
  { name: "Green", hexCode: "#008000" },
  { name: "Yellow", hexCode: "#FFFF00" },
  { name: "Brown", hexCode: "#A52A2A" },
  { name: "Orange", hexCode: "#FFA500" },
  { name: "Purple", hexCode: "#800080" },
  { name: "Beige", hexCode: "#F5F5DC" },
  { name: "Gold", hexCode: "#FFD700" },
  { name: "Bronze", hexCode: "#CD7F32" },
  { name: "Copper", hexCode: "#B87333" },
  { name: "Other", hexCode: "#00000000" },
];
