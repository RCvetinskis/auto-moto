import { UseFormReturn } from "react-hook-form";
import { FormItemCheckBox } from "../form-item-checkbox";
import { z } from "zod";
import { carFormSchema } from "@/schema/zod-schema";
import {
  audioList,
  electronicList,
  exteriorList,
  interiorList,
  otherOptionsList,
  safetyList,
} from "@/lib/auto-data";

interface ThirdRowProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
}

export const ThirdRow = ({ form }: ThirdRowProps) => {
  return (
    <div>
      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Interior</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {interiorList.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `interiorOptions.${item.key}` as keyof z.infer<
                typeof carFormSchema
              >
            }
          />
        ))}
      </div>

      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Exterior</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {exteriorList.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `exteriorOptions.${item.key}` as keyof z.infer<
                typeof carFormSchema
              >
            }
          />
        ))}
      </div>
      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Electronics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {electronicList.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `electronicsOptions.${item.key}` as keyof z.infer<
                typeof carFormSchema
              >
            }
          />
        ))}
      </div>

      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Safety & Security</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {safetyList.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `safetySecurityOptions.${item.key}` as keyof z.infer<
                typeof carFormSchema
              >
            }
          />
        ))}
      </div>

      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Audio & Video</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
        {audioList.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `audioVideoOptions.${item.key}` as keyof z.infer<
                typeof carFormSchema
              >
            }
          />
        ))}
      </div>

      <h2 className="text-lg font-bold my-4 pl-3 md:pl-0">Other Options</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {otherOptionsList.map((item) => (
          <FormItemCheckBox
            key={item.key}
            form={form}
            label={item.value}
            name={
              `otherOptions.${item.key}` as keyof z.infer<typeof carFormSchema>
            }
          />
        ))}
      </div>
    </div>
  );
};
