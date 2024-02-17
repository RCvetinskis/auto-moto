"use server";
import axios from "axios";
export const getCities = async (country: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.CITIES_API_URL}/countries/cities`,
      { country }
    );

    if (!data || data.error) throw new Error("data not found");

    return data.data;
  } catch (error) {
    console.log("ERROR_ACTION ,getCarBrands", error);
    return [];
  }
};
