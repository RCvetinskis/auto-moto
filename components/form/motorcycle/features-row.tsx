import { UseFormReturn } from "react-hook-form";
import { FormItemCheckBox } from "../form-item-checkbox";
import { motorcycleFormSchema } from "@/schema/zod-schema";
import { z } from "zod";
import { motorcycleFeatures } from "@/lib/auto-data";

type Props = {
  form: UseFormReturn<z.infer<typeof motorcycleFormSchema>>;
};

const FeaturesRow = ({ form }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Features</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {motorcycleFeatures.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `features.${item.key}` as keyof z.infer<
                typeof motorcycleFormSchema
              >
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesRow;
