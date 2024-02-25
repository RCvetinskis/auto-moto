"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, PhoneCall } from "lucide-react";
import { toast } from "sonner";

type Props = {
  phoneNo: string;
};

const ContactModal = ({ phoneNo }: Props) => {
  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNo);

    toast.success("Copied to clipboard!");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} className="flex gap-3 w-full">
          <PhoneCall size={16} />
          <p> {phoneNo}</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[300px]">
        <DialogHeader>
          <DialogTitle>{phoneNo}</DialogTitle>
        </DialogHeader>
        <div className="mt-3 w-full flex justify-between">
          <Button className="flex gap-3">
            <PhoneCall size={16} />
            <a href={`tel:${phoneNo}`}>Call</a>
          </Button>
          <Button onClick={copyPhoneNumber} className="flex gap-3">
            <Copy size={16} />
            <p>Copy</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
