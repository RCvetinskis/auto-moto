"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowDownFromLine, ArrowUpFromLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormMoreItemsModalProps {
  children: React.ReactNode;
  text: string;
}
export const SlideContent = ({ children, text }: FormMoreItemsModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(!open)}>
        {text}
        {open ? (
          <ArrowUpFromLine className="ml-2" size={12} />
        ) : (
          <ArrowDownFromLine className="ml-2" size={12} />
        )}
      </Button>

      <div
        className={cn(
          "my-4 transition-all duration-300 ease-in-out max-h-0 p-0  overflow-hidden ",
          open && "max-h-fit p-4"
        )}
      >
        {open && children}
      </div>
    </>
  );
};
