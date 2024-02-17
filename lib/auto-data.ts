import { enumToArray } from "@/utils/enumToArray";
import {
  generateMonths,
  generateTaYears,
  generateYearsArray,
} from "@/utils/generateDates";
import { generateWheelSizes } from "@/utils/generateWheelSizes";
import { BodyType, Defects, FuelType, GearBox } from "@prisma/client";
import {
  InteriorOption,
  ExteriorOption,
  ElectronicsOption,
  SafetySecurityOption,
  AudioVideoOption,
  OtherOption,
} from "@/enums";

export const CLIENT_URL = "https://long-rings-switch.loca.lt";
export const gears = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const cilinders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const wheelSizes = generateWheelSizes();
export const interiorList = enumToArray(InteriorOption);
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
export const exteriorList = enumToArray(ExteriorOption);
export const electronicList = enumToArray(ElectronicsOption);
export const safetyList = enumToArray(SafetySecurityOption);
export const audioList = enumToArray(AudioVideoOption);
export const otherOptionsList = enumToArray(OtherOption);

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
