import { motorcycleFormSchema } from "@/schema/zod-schema";
import { FormItemSelect } from "../form-item-select";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { getMotorcycleModels } from "@/actions/fetch/transport-api-action";
import {
  condition,
  defectsList,
  monthsList,
  motorCycleType,
  yearsList,
} from "@/lib/auto-data";
import { FormItemInput } from "../form-item-input";
import { CustomSeparator } from "@/components/ui/custom-separator";

type Props = {
  form: UseFormReturn<z.infer<typeof motorcycleFormSchema>>;
  motorcycles: string[];
};

const FirstRow = ({ form, motorcycles }: Props) => {
  const [isMounted, setIsMounted] = useState(true);
  const [motoModels, setMotoModels] = useState([]);

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
        const models = await getMotorcycleModels(brandValue);
        setMotoModels(models);
      } catch (error) {
        console.log("ERROR_ACTION, useEffect", error);
      }
    };

    fetchData();
  }, [brandValue, isMounted, form]);

  return (
    <div className="space-y-4">
      <CustomSeparator text="Main advertisment data" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3">
        <FormItemSelect
          form={form}
          data={motorcycles}
          name={"required.brand" as keyof z.infer<typeof motorcycleFormSchema>}
          label=" Motorcycle"
          placeholder="Select Motorcycle..."
        />
        <FormItemSelect
          form={form}
          data={motoModels}
          name={"required.model" as keyof z.infer<typeof motorcycleFormSchema>}
          label=" Model"
          placeholder="Select Model..."
          disabled={motoModels.length === 0}
        />
        <FormItemSelect
          form={form}
          data={condition}
          name={
            "required.condition" as keyof z.infer<typeof motorcycleFormSchema>
          }
          label=" Condition"
          placeholder="Select Condition..."
        />
        <FormItemSelect
          form={form}
          data={motorCycleType}
          name={
            "required.motorcycleType" as keyof z.infer<
              typeof motorcycleFormSchema
            >
          }
          label=" Type"
          placeholder="Select Type..."
        />

        <FormItemInput
          form={form}
          type="number"
          name={"required.cc" as keyof z.infer<typeof motorcycleFormSchema>}
          label="Engine Capacity CC"
          placeholder="600cc"
        />

        <div className="flex gap-2">
          <FormItemSelect
            form={form}
            data={yearsList}
            name={"required.year" as keyof z.infer<typeof motorcycleFormSchema>}
            label=" Year"
            placeholder="Select Year..."
          />
          <FormItemSelect
            form={form}
            data={monthsList}
            name={
              "required.month" as keyof z.infer<typeof motorcycleFormSchema>
            }
            label=" Month"
            placeholder="Select Month..."
          />
        </div>
        <div className="flex  gap-2">
          <FormItemInput
            type="number"
            form={form}
            name={
              "required.mileage" as keyof z.infer<typeof motorcycleFormSchema>
            }
            label="Mileage"
            placeholder="Mileage..."
          />
          <FormItemInput
            form={form}
            type="number"
            name={
              "required.price" as keyof z.infer<typeof motorcycleFormSchema>
            }
            label="Price"
            placeholder="Price..."
          />
        </div>

        <FormItemSelect
          form={form}
          data={defectsList}
          name={
            "required.defects" as keyof z.infer<typeof motorcycleFormSchema>
          }
          label=" Defects"
          placeholder="Select Defects..."
        />
      </div>
    </div>
  );
};

export default FirstRow;
