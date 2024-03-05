import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { carFormSchema, motorcycleFormSchema } from "@/schema/zod-schema";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { Checkbox } from "../ui/checkbox";

interface FormItemComponentProps {
  form: any;
  data: any[];
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

export const FormItemMultiSelect = ({
  form,
  data,
  name,
  label,
  placeholder,
  disabled,
}: FormItemComponentProps) => {
  const [open, setOpen] = useState(false);

  const onSelect = (item: any) => {
    const selectedValues = form.getValues(name) || [];
    const updatedValues = selectedValues.includes(item)
      ? selectedValues.filter((value: any) => value !== item)
      : [...selectedValues, item];
    form.setValue(name, updatedValues);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="!text-sm md:text-base">{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full  justify-between !text-sm md:text-base capitalize",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? `Selected (${field.value.length})` : label}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-fit">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandEmpty>No {label} found</CommandEmpty>
                <CommandGroup className="max-h-[300px] overflow-y-auto capitalize">
                  {data.map((item) => (
                    <CommandItem
                      value={item}
                      key={item}
                      onSelect={() => onSelect(item)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value?.includes(item)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
