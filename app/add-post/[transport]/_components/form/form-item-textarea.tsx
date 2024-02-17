import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { carFormSchema } from "@/schema/zod-schema";
import { UseFormReturn } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

interface FormItemComponentProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
  name: any;
  placeholder?: string;
  disabled?: boolean;
}

export const FormItemTextarea = ({
  form,
  name,
  placeholder,
  disabled,
}: FormItemComponentProps) => {
  return (
    <FormField
      control={form.control}
      defaultValue={""}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full h-full">
          <FormControl>
            <Textarea
              disabled={disabled}
              placeholder={placeholder}
              className="resize-none h-full"
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
