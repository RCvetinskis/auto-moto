import { UseFormReturn } from "react-hook-form";
import { FormItemInput } from "../form-item-input";
import { FormItemSelect } from "../form-item-select";
import { z } from "zod";
import { carFormSchema } from "@/schema/zod-schema";
import { countriesList, driveTypeList } from "@/lib/auto-data";
import { useEffect, useState } from "react";
import { getCities } from "@/actions/fetch/cities-api-action";

interface FinalRowProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
}

export const FinalRow = ({ form }: FinalRowProps) => {
  const [cities, setCities] = useState([]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  const countryValue = form.watch("required.country");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!countryValue || !isMounted) return;
        const data = await getCities(countryValue.toLowerCase());
        setCities(data);
      } catch (error) {
        console.log("ERROR_ACTION, useEffect", error);
      }
    };

    fetchData();
  }, [countryValue, isMounted, form]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-3">
        <FormItemInput
          form={form}
          type="string"
          name={"required.phone" as keyof z.infer<typeof carFormSchema>}
          label="Phone No"
          placeholder="Phone no..."
        />
        <FormItemInput
          form={form}
          type="string"
          name={"required.email" as keyof z.infer<typeof carFormSchema>}
          label="Email"
          placeholder="Email..."
        />

        <FormItemSelect
          form={form}
          data={countriesList}
          name={"required.country" as keyof z.infer<typeof carFormSchema>}
          label="Country"
          placeholder="Select Country..."
        />
        <FormItemSelect
          form={form}
          data={cities}
          name={"required.city" as keyof z.infer<typeof carFormSchema>}
          label="City"
          placeholder="Select City..."
          disabled={cities.length === 0}
        />
      </div>
    </div>
  );
};
