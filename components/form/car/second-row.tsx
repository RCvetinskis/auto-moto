import { UseFormReturn } from "react-hook-form";
import { FormItemInput } from "../form-item-input";
import { FormItemSelect } from "../form-item-select";
import { z } from "zod";
import { carFormSchema } from "@/schema/zod-schema";
import { TAYearsList, driveTypeList, monthsList } from "@/lib/auto-data";

interface SecondRowProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
}

export const SecondRow = ({ form }: SecondRowProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3  gap-3">
        <FormItemSelect
          form={form}
          data={TAYearsList}
          name={"optional.TA_year" as keyof z.infer<typeof carFormSchema>}
          label="Select TA Year"
          placeholder="Select TA Year..."
        />
        <FormItemSelect
          form={form}
          data={monthsList}
          name={"optional.TA_month" as keyof z.infer<typeof carFormSchema>}
          label="Select TA Month"
          placeholder="Select TA Month..."
        />

        <FormItemSelect
          form={form}
          data={driveTypeList}
          name={"optional.drive" as keyof z.infer<typeof carFormSchema>}
          label="Drive Type"
          placeholder="Select Drive..."
        />
      </div>
      <div className="w-full flex gap-3 items-center mt-5">
        <FormItemInput
          type="string"
          form={form}
          name={
            "optional.engine_modification" as keyof z.infer<
              typeof carFormSchema
            >
          }
          label="Modification:(TDI,TSI,CDI..,)"
          placeholder="TDI,TSI,CDI..."
        />
        <FormItemInput
          type="number"
          form={form}
          name={"optional.kW" as keyof z.infer<typeof carFormSchema>}
          label="Power,kW:"
          placeholder="103"
        />
      </div>
    </div>
  );
};
