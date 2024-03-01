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
import { useState } from "react";
import { TransportColor } from "@/types";

type Props = {
  form: any;
  data: TransportColor[];
  name:
    | keyof z.infer<typeof carFormSchema>
    | keyof z.infer<typeof motorcycleFormSchema>;
  label: string;
  placeholder: string;
  disabled?: boolean;
};

const FormItemColor = ({
  form,
  data,
  name,
  label,
  placeholder,
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<TransportColor | null>(null);

  const onSelect = (item: TransportColor) => {
    form.setValue(name, item.name);
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="flex items-center  gap-3 ">
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
                      ? data.find((item) => item.name === field.value)?.name ??
                        label
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
                        value={item.name}
                        key={item.hexCode}
                        onSelect={() => onSelect(item)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            item.name === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {item.name}
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
      <div
        className="w-6 h-6 rounded-full aspect-square mt-8 "
        style={{ backgroundColor: selected?.hexCode }}
      />
    </div>
  );
};

export default FormItemColor;
