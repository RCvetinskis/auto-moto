"use client";

import { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
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
import { useParams, useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

interface TransportSwitcherProps {
  transports: string[];
  disabled?: boolean;
}

export const TransportSwitcher = ({
  transports,
  disabled,
}: TransportSwitcherProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const params = useParams();

  const formattedItems = transports.map((transport) => ({
    value: transport,
    label: capitalizeFirstLetter(transport),
  }));

  const currentTransport = formattedItems.find(
    (item) => item.value === params.transport
  );

  const onTransportSelect = (selected: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/add-post/${selected.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
          disabled={disabled}
        >
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />

          {currentTransport ? currentTransport.label : "Select Transport..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search transport..." />
          <CommandEmpty>No transport found.</CommandEmpty>
          <CommandGroup>
            {formattedItems.map((transport) => (
              <CommandItem
                key={transport.value}
                value={transport.value}
                onSelect={() => onTransportSelect(transport)}
              >
                {transport.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
