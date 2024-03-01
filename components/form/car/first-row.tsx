"use client";
import { z } from "zod";
import { FormItemSelect } from "../form-item-select";
import { UseFormReturn } from "react-hook-form";
import { carFormSchema } from "@/schema/zod-schema";
import { CarBrandApi } from "@/types";
import { useEffect, useState } from "react";
import { getCarModels } from "@/actions/fetch/transport-api-action";
import {
  bodyList,
  defectsList,
  doorsList,
  fuelList,
  gearBoxList,
  monthsList,
  wheelSideList,
  yearsList,
} from "@/lib/auto-data";
import { FormItemInput } from "../form-item-input";

interface FirstRowProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
  cars: CarBrandApi[];
}
export const FirstRow = ({ form, cars }: FirstRowProps) => {
  const [isMounted, setIsMounted] = useState(true);
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const brandValue = form.watch("required.brand");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!brandValue || !isMounted) return;
        const models = await getCarModels(brandValue);
        setCarModels(models);
      } catch (error) {
        console.log("ERROR_ACTION, useEffect", error);
      }
    };

    fetchData();
  }, [brandValue, isMounted, form]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-3">
        <FormItemSelect
          form={form}
          data={cars}
          name={"required.brand" as keyof z.infer<typeof carFormSchema>}
          label="Select Car"
          placeholder="Select Car..."
        />

        <FormItemSelect
          form={form}
          data={carModels}
          name={"required.model" as keyof z.infer<typeof carFormSchema>}
          label="Select Model"
          placeholder="Select Model..."
          disabled={carModels.length === 0}
        />
        <FormItemSelect
          form={form}
          data={gearBoxList}
          name={"required.gearbox" as keyof z.infer<typeof carFormSchema>}
          label="Select Gearbox"
          placeholder="Select Gearbox..."
        />

        <FormItemSelect
          form={form}
          data={yearsList}
          name={"required.year" as keyof z.infer<typeof carFormSchema>}
          label="Select Year"
          placeholder="Select Year..."
        />
        <FormItemSelect
          form={form}
          data={monthsList}
          name={"required.month" as keyof z.infer<typeof carFormSchema>}
          label="Select Month"
          placeholder="Select Month..."
        />
        <FormItemSelect
          form={form}
          data={fuelList}
          name={"required.fuel" as keyof z.infer<typeof carFormSchema>}
          label="Select Fuel"
          placeholder="Select Fuel..."
        />
        <FormItemSelect
          form={form}
          data={bodyList}
          name={"required.body" as keyof z.infer<typeof carFormSchema>}
          label="Select Body"
          placeholder="Select Body..."
        />
        <FormItemSelect
          form={form}
          data={doorsList}
          name={"required.doors" as keyof z.infer<typeof carFormSchema>}
          label="Select Doors"
          placeholder="Select Doors..."
        />

        <FormItemSelect
          form={form}
          data={wheelSideList}
          name={"required.wheelSide" as keyof z.infer<typeof carFormSchema>}
          label="Select Wheel Side"
          placeholder="Select Wheel Side..."
        />
        <FormItemSelect
          form={form}
          data={defectsList}
          name={"required.defects" as keyof z.infer<typeof carFormSchema>}
          label="Select Defects"
          placeholder="Select Defects..."
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-3 mt-5">
        <FormItemInput
          type="number"
          form={form}
          name={"required.mileage" as keyof z.infer<typeof carFormSchema>}
          label="Mileage"
          placeholder="Mileage..."
        />
        <FormItemInput
          form={form}
          type="string"
          name={"required.engine" as keyof z.infer<typeof carFormSchema>}
          label="Engine Capacity (liters)"
          placeholder="Engine 2.0l..."
        />
        <FormItemInput
          form={form}
          type="number"
          name={"required.price" as keyof z.infer<typeof carFormSchema>}
          label="Price"
          placeholder="Price..."
        />
      </div>
    </div>
  );
};
