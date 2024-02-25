"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import Conversations from "../conversation/conversations";
import { MessageCircle } from "lucide-react";

interface Props {
  userId: string;
}
export const ConversationsModal = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size={"lg"}
        className="flex gap-3 w-full"
        onClick={() => setOpen(!open)}
      >
        <MessageCircle />
        <p>Message to the seller</p>
      </Button>

      {open && (
        <div>
          <Conversations />
        </div>
      )}
    </>
  );
};
