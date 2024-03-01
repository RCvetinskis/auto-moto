import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

interface FormItemComponentProps {
  form: any;
  type: "number" | "string";
  name: any;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

export const FormItemInput = ({
  form,
  type,
  name,
  label,
  placeholder,
  disabled,
}: FormItemComponentProps) => {
  return (
    <FormField
      control={form.control}
      defaultValue={""}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="truncate">{label}</FormLabel>

          <FormControl>
            <Input
              disabled={disabled}
              placeholder={placeholder}
              {...field}
              type={type}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
