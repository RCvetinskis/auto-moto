import {
  getCarModels,
  getMotorcycleModels,
} from "@/actions/fetch/transport-api-action";
import React, { useEffect, useState } from "react";

import { UseFormReturn } from "react-hook-form";
import { motoSearchFormSchema } from "@/schema/zod-schema";
import { z } from "zod";
import { FormItemSelect } from "@/components/form/form-item-select";
import { motorCycleType, priceSelectList, yearsList } from "@/lib/auto-data";
import { FormItemMultiSelect } from "@/components/form/form-item-multi-select";

type Props = {
  form: UseFormReturn<z.infer<typeof motoSearchFormSchema>>;
  currentTransport: string;
  brands: string[];
};

const MotoInputs = ({ currentTransport, form, brands }: Props) => {
  const [isMounted, setIsMounted] = useState(true);

  const [models, setModels] = useState([]);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const brandValue = form.watch("brand");
  useEffect(() => {
    if (brandValue === "All" && models) {
      setModels([]);
    }
    if (!brandValue || !isMounted || brandValue === "All") return;

    const fetchData = async () => {
      try {
        const data = await getMotorcycleModels(brandValue);
        setModels(data);
      } catch (error) {
        console.log("ERROR_ACTION, useEffect", error);
      }
    };

    fetchData();
  }, [isMounted, currentTransport, brandValue]);

  return (
    <div className="grid grid-cols-2  gap-3 ">
      <FormItemSelect
        form={form}
        data={brands}
        name={"brand" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Select Brand"
        placeholder="Select Brand..."
        disabled={brands.length === 0}
      />

      <FormItemSelect
        form={form}
        data={models}
        name={"model" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Select Model"
        placeholder="Select Model..."
        disabled={models.length === 0}
      />
      <FormItemSelect
        form={form}
        data={yearsList}
        name={"yearFrom" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Year From"
        placeholder="From..."
      />

      <FormItemSelect
        form={form}
        data={yearsList}
        name={"yearTill" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Year Till"
        placeholder="Till..."
      />
      <FormItemSelect
        form={form}
        data={priceSelectList}
        name={"priceFrom" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Price From"
        placeholder="From..."
      />

      <FormItemSelect
        form={form}
        data={priceSelectList}
        name={"priceTill" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Price Till"
        placeholder="Till..."
      />

      <div className="flex items-center gap-2">
        <FormItemSelect
          form={form}
          data={priceSelectList}
          name={"ccFrom" as keyof z.infer<typeof motoSearchFormSchema>}
          label="CC From"
          placeholder="CC..."
        />

        <FormItemSelect
          form={form}
          data={priceSelectList}
          name={"ccTill" as keyof z.infer<typeof motoSearchFormSchema>}
          label="CC Till"
          placeholder="CC..."
        />
      </div>
      <FormItemMultiSelect
        form={form}
        data={motorCycleType}
        name={"motorcycleType" as keyof z.infer<typeof motoSearchFormSchema>}
        label="Moto Type"
        placeholder="Moto Type..."
      />
    </div>
  );
};

export default MotoInputs;
