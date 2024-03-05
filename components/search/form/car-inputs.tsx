import { getCarModels } from "@/actions/fetch/transport-api-action";
import React, { useEffect, useState } from "react";

import { UseFormReturn } from "react-hook-form";
import { carSearchFormSchema } from "@/schema/zod-schema";
import { z } from "zod";
import { FormItemSelect } from "@/components/form/form-item-select";
import {
  bodyList,
  fuelList,
  priceSelectList,
  yearsList,
} from "@/lib/auto-data";
import { FormItemMultiSelect } from "@/components/form/form-item-multi-select";

type Props = {
  form: UseFormReturn<z.infer<typeof carSearchFormSchema>>;
  currentTransport: string;
  brands: string[];
};

const CarInputs = ({ currentTransport, form, brands }: Props) => {
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
        const data = await getCarModels(brandValue);

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
        name={"brand" as keyof z.infer<typeof carSearchFormSchema>}
        label="Select Brand"
        placeholder="Select Brand..."
        disabled={brands.length === 0}
      />

      <FormItemSelect
        form={form}
        data={models}
        name={"model" as keyof z.infer<typeof carSearchFormSchema>}
        label="Select Model"
        placeholder="Select Model..."
        disabled={models.length === 0}
      />
      <FormItemSelect
        form={form}
        data={yearsList}
        name={"yearFrom" as keyof z.infer<typeof carSearchFormSchema>}
        label="Year From"
        placeholder="From..."
      />

      <FormItemSelect
        form={form}
        data={yearsList}
        name={"yearTill" as keyof z.infer<typeof carSearchFormSchema>}
        label="Year Till"
        placeholder="Till..."
      />
      <FormItemSelect
        form={form}
        data={priceSelectList}
        name={"priceFrom" as keyof z.infer<typeof carSearchFormSchema>}
        label="Price From"
        placeholder="From..."
      />

      <FormItemSelect
        form={form}
        data={priceSelectList}
        name={"priceTill" as keyof z.infer<typeof carSearchFormSchema>}
        label="Price Till"
        placeholder="Till..."
      />
      <FormItemMultiSelect
        form={form}
        data={fuelList}
        name={"fuel" as keyof z.infer<typeof carSearchFormSchema>}
        label="Fuel Type"
        placeholder="Fuel..."
      />
      <FormItemMultiSelect
        form={form}
        data={bodyList}
        name={"body" as keyof z.infer<typeof carSearchFormSchema>}
        label="Body Type"
        placeholder="Body..."
      />
    </div>
  );
};

export default CarInputs;
