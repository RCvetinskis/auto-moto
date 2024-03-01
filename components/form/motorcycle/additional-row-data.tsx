import { motorcycleFormSchema } from "@/schema/zod-schema";
import { FormItemSelect } from "../form-item-select";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import { CustomSeparator } from "@/components/ui/custom-separator";
import {
  TAYearsList,
  cilinders,
  cooling,
  gears,
  monthsList,
  motoFuel,
  transportColors,
} from "@/lib/auto-data";
import FormItemColor from "../form-item-color";
import { FormItemInput } from "../form-item-input";

type Props = {
  form: UseFormReturn<z.infer<typeof motorcycleFormSchema>>;
};

const AdditionalRowData = ({ form }: Props) => {
  return (
    <div className="space-y-4">
      <CustomSeparator text="Additional data" />
      <div className="grid grid-cols-2 md:grid-cols-3  gap-3">
        <FormItemSelect
          form={form}
          data={TAYearsList}
          name={
            "optional.TA_year" as keyof z.infer<typeof motorcycleFormSchema>
          }
          label="TA/TS Year"
          placeholder="Select Year..."
        />
        <FormItemSelect
          form={form}
          data={monthsList}
          name={
            "optional.TA_month" as keyof z.infer<typeof motorcycleFormSchema>
          }
          label="TA/TS Month"
          placeholder="Select Month..."
        />

        <FormItemColor
          form={form}
          data={transportColors}
          name={"optional.color" as keyof z.infer<typeof motorcycleFormSchema>}
          label="Color"
          placeholder="Color..."
        />
        <FormItemInput
          form={form}
          type="number"
          name={"optional.kW" as keyof z.infer<typeof motorcycleFormSchema>}
          label="Power kW"
          placeholder="60kW"
        />
        <FormItemInput
          form={form}
          type="number"
          name={"optional.weight" as keyof z.infer<typeof motorcycleFormSchema>}
          label="Weight Kg"
          placeholder="200kg"
        />
        <FormItemSelect
          form={form}
          data={cooling}
          name={
            "optional.cooling" as keyof z.infer<typeof motorcycleFormSchema>
          }
          label="Cooling"
          placeholder="Select Cooling..."
        />
        <FormItemSelect
          form={form}
          data={motoFuel}
          name={"optional.fuel" as keyof z.infer<typeof motorcycleFormSchema>}
          label="Fuel"
          placeholder="Select Fuel..."
        />
        <FormItemSelect
          form={form}
          data={gears}
          name={"optional.gears" as keyof z.infer<typeof motorcycleFormSchema>}
          label="Gears"
          placeholder="Select Gears..."
        />
        <FormItemSelect
          form={form}
          data={cilinders}
          name={
            "optional.cilinders" as keyof z.infer<typeof motorcycleFormSchema>
          }
          label="Cilinders"
          placeholder="Select Cilinders..."
        />
      </div>
    </div>
  );
};

export default AdditionalRowData;
