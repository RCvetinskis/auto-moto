"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { motorcycleFormSchema } from "@/schema/zod-schema";
import { useUser } from "@clerk/nextjs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FirstRow from "./first-row";
import AdditionalRowData from "./additional-row-data";
import FeaturesRow from "./features-row";
import CommentRow from "./comment-row";
import { ContactsRow } from "./contacts-row";
import { useState, useTransition } from "react";

import { ImageUpload } from "../image-upload";
import { usePost } from "@/store/store";
import { useRouter } from "next/navigation";
import { Images } from "@prisma/client";

type Props = {
  motorcycles: string[];
};

const MotorCycleForm = ({ motorcycles }: Props) => {
  const [images, setImages] = useState<Images[] | []>([]);
  const { user, isSignedIn } = useUser();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof motorcycleFormSchema>>({
    resolver: zodResolver(motorcycleFormSchema),
    defaultValues: {
      required: {
        email: isSignedIn && user ? user.emailAddresses[0].emailAddress : "",
      },
    },
  });
  const { addPost } = usePost((state) => state);
  function onSubmit(data: z.infer<typeof motorcycleFormSchema>) {
    startTransition(() => {
      addPost({ type: "motorcycle", data, images });
      router.push("/add-post/motorcycle/service");
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FirstRow form={form} motorcycles={motorcycles} />
        <AdditionalRowData form={form} />
        <FeaturesRow form={form} />
        <CommentRow form={form} />
        <ImageUpload images={images} setImages={setImages} />
        <ContactsRow form={form} />
        <footer className="py-10 ">
          <Button
            disabled={isPending}
            type="submit"
            size={"lg"}
            className="w-full "
          >
            Continue
          </Button>
        </footer>
      </form>
    </Form>
  );
};

export default MotorCycleForm;
