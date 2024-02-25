"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { carFormSchema } from "@/schema/zod-schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface FormItemCheckBoxProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
  name: any;
  label: string;
}

export const FormItemCheckBox = ({
  form,
  name,
  label,
}: FormItemCheckBoxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-300  truncate p-2 py-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          <FormLabel className="text-xs md:text-sm capitalize truncate">
            {label}
          </FormLabel>
        </FormItem>
      )}
    />
  );
};
