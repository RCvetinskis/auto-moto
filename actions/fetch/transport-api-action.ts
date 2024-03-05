"use server";
import axios from "axios";
export const getCarBrands = async () => {
  try {
    const { data } = await axios.get(`${process.env.CARS_API_URL}/cars`);

    if (!data) throw new Error("Data not found");

    const convertedData = data.map((item: any) => item.brand);

    return convertedData;
  } catch (error) {
    console.log("ERROR_ACTION ,getCarBrands", error);
    return [];
  }
};

export const getCarModels = async (brand: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.CARS_API_URL}/cars/${brand}`
    );

    if (!data) throw new Error("Data not found");
    return data[0].models;
  } catch (error) {
    console.log("ERROR_ACTION ,getCarBrands", error);
    return [];
  }
};

export const getMotorcycleBrands = async () => {
  try {
    const { data } = await axios.get(`${process.env.CARS_API_URL}/motos`);

    if (!data) throw new Error("Data not found");
    const convertedData = data.map((item: any) => item.brand);
    return convertedData;
  } catch (error) {
    console.log("ERROR_ACTION ,getMotorcylebrands", error);
    return [];
  }
};
export const getMotorcycleModels = async (brand: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.CARS_API_URL}/motos/${brand}`
    );

    if (!data) throw new Error("Data not found");
    return data[0].models;
  } catch (error) {
    console.log("ERROR_ACTION ,getMotorcyleModels", error);
    return [];
  }
};
