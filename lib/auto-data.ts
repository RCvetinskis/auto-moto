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
export const motoCcList = [
  50, 80, 125, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 750, 800,
  850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 2000,
  2200, 2500,
];

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

export const priceSelectList = [
  300, 500, 150, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000,
  7000, 8000, 9000, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 45000,
  60000, 70000, 80000, 90000, 100000,
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
