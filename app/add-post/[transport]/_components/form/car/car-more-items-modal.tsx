"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormItemInput } from "../form-item-input";
import { FormItemSelect } from "../form-item-select";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { carFormSchema } from "@/schema/zod-schema";
import { cilinders, gears, wheelSizes } from "@/lib/auto-data";
interface FormMoreItemsModalProps {
  children: React.ReactNode;
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
}
export const CarMoreItemsModal = ({
  children,
  form,
}: FormMoreItemsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* trigger open */}
      <Button asChild variant={"ghost"} onClick={() => setOpen(!open)}>
        {children}
      </Button>

      <div
        className={`my-4 transition-all  duration-300 ease-in-out ${
          open ? "max-h-screen p-4" : "max-h-0 p-0 "
        } overflow-hidden`}
      >
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
    </>
  );
};
