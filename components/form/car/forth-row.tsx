import { UseFormReturn } from "react-hook-form";

import { z } from "zod";
import { carFormSchema } from "@/schema/zod-schema";
import { FormItemTextarea } from "../form-item-textarea";

interface ForthRowProps {
  form: UseFormReturn<z.infer<typeof carFormSchema>>;
}

export const ForthRow = ({ form }: ForthRowProps) => {
  return (
    <div className="h-[100px] md:h-[200px] px-2">
      <FormItemTextarea
        form={form}
        name={"optional.comment" as keyof z.infer<typeof carFormSchema>}
        placeholder="Write information about vehicle..."
      />
    </div>
  );
};
