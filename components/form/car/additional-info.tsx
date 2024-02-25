import { carFormSchema } from "@/schema/zod-schema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cilinders, gears, wheelSizes } from "@/lib/auto-data";
import { FormItemSelect } from "../form-item-select";
import { FormItemInput } from "../form-item-input";

type Props = {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
};

const AdditionalInfo = ({ form }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3  gap-3">
        <FormItemSelect
          form={form}
          data={gears}
          name={"optional.gears" as keyof z.infer<typeof carFormSchema>}
          label="Gears"
          placeholder="Gears..."
        />
        <FormItemSelect
          form={form}
          data={cilinders}
          name={"optional.cilinders" as keyof z.infer<typeof carFormSchema>}
          label="Cilinders"
          placeholder="Cilinders..."
        />
        <FormItemSelect
          form={form}
          data={wheelSizes}
          name={"optional.wheelSize" as keyof z.infer<typeof carFormSchema>}
          label="Wheel Size"
          placeholder="Wheel Size..."
        />
      </div>
      <div className="mt-3">
        <FormItemInput
          form={form}
          type="number"
          name={"optional.weight" as keyof z.infer<typeof carFormSchema>}
          placeholder="1000kg"
          label="Weight,kg"
        />
      </div>
    </div>
  );
};

export default AdditionalInfo;
