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

interface FormItemComponentProps {
  form: any;
  data: any[];
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
}

export const FormItemSelect = memo(
  ({
    form,
    data,
    name,
    label,
    placeholder,
    disabled,
  }: FormItemComponentProps) => {
    const [open, setOpen] = useState(false);

    const onSelect = (item: any) => {
      form.setValue(name, item);
      setOpen(false);
    };

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel className="text-xs md:text-base">{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full  justify-between text-xs md:text-base capitalize",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? data.find((item) => item === field.value)
                      : label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-fit">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandEmpty>No {label} found</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-y-auto   capitalize">
                    {data.map((item) => (
                      <CommandItem
                        value={item}
                        key={item}
                        onSelect={() => onSelect(item)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item === field.value ? "opacity-100" : "opacity-0"
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
  },
  (prevProps, nextProps) => {
    // Only re-render if props other than form have changed
    return (
      prevProps.data === nextProps.data &&
      prevProps.name === nextProps.name &&
      prevProps.label === nextProps.label &&
      prevProps.placeholder === nextProps.placeholder &&
      prevProps.disabled === nextProps.disabled
    );
  }
);
