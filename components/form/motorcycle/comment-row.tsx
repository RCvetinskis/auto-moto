import { UseFormReturn } from "react-hook-form";
import { FormItemTextarea } from "../form-item-textarea";

import { z } from "zod";
import { motorcycleFormSchema } from "@/schema/zod-schema";

type Props = {
  form: UseFormReturn<z.infer<typeof motorcycleFormSchema>>;
};

const CommentRow = ({ form }: Props) => {
  return (
    <div className="h-[100px] md:h-[200px] px-2">
      <FormItemTextarea
        form={form}
        name={"optional.comment" as keyof z.infer<typeof motorcycleFormSchema>}
        placeholder="Write information about vehicle..."
      />
    </div>
  );
};

export default CommentRow;
