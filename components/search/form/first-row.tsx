import {
  getCarBrands,
  getCarModels,
  getMotorcycleModels,
} from "@/actions/fetch/transport-api-action";
import React, { useEffect, useState } from "react";
import InputSelect from "../../input-select";
import { UseFormReturn } from "react-hook-form";
import { searchFormSchema } from "@/schema/zod-schema";
import { z } from "zod";
import { FormItemSelect } from "@/components/form/form-item-select";

type Props = {
  form: UseFormReturn<z.infer<typeof searchFormSchema>>;
  currentTransport: string;
  brands: string[];
};

const FirstRow = ({ currentTransport, form, brands }: Props) => {
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
    if (!brandValue || !isMounted) return;

    const fetchData = async () => {
      if (currentTransport === "auto") {
        try {
          const data = await getCarModels(brandValue);
          setModels(data);
        } catch (error) {
          console.log("ERROR_ACTION, useEffect", error);
        }
      } else if (currentTransport === "moto") {
        try {
          const data = await getMotorcycleModels(brandValue);
          setModels(data);
        } catch (error) {
          console.log("ERROR_ACTION, useEffect", error);
        }
      }
    };

    fetchData();
  }, [isMounted, currentTransport, brandValue]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-3">
        <FormItemSelect
          form={form}
          data={brands}
          name={"brand" as keyof z.infer<typeof searchFormSchema>}
          label="Select Car"
          placeholder="Select Car..."
          disabled={brands.length === 0}
        />

        <FormItemSelect
          form={form}
          data={models}
          name={"model" as keyof z.infer<typeof searchFormSchema>}
          label="Select Model"
          placeholder="Select Model..."
          disabled={models.length === 0}
        />
      </div>
    </div>
  );
};

export default FirstRow;
