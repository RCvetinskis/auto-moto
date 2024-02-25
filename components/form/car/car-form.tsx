"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { useMemo, useState, useTransition } from "react";

import { carFormSchema } from "@/schema/zod-schema";

import { CustomSeparator } from "@/components/ui/custom-separator";

import { FirstRow } from "./first-row";
import { SecondRow } from "./second-row";
import { ThirdRow } from "./third-row";
import { ForthRow } from "./forth-row";
import { ImageUpload } from "../image-upload";
import { CarBrandApi, imagesType } from "@/types";
import { FinalRow } from "./final-row";
import { usePost } from "@/store/store";
import { useRouter } from "next/navigation";
import AdditionalInfo from "./additional-info";
import { SlideContent } from "@/components/modals/slide-content";
import { useUser } from "@clerk/nextjs";

interface AddCarProps {
  initialCars: CarBrandApi[];
}
export const CarForm = ({ initialCars }: AddCarProps) => {
  const [images, setImages] = useState<imagesType[] | []>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const cars = useMemo(() => initialCars, [initialCars]);

  const { user, isSignedIn } = useUser();
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      required: {
        email: isSignedIn && user ? user.emailAddresses[0].emailAddress : "",
      },
    },
  });

  const { addPost } = usePost((state) => state);
  function onSubmit(data: z.infer<typeof carFormSchema>) {
    startTransition(() => {
      addPost({ data, images });
      router.push("/add-post/car/service");
    });
  }

  // TODO: display imges, and reorder them
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FirstRow form={form} cars={cars} />

        <CustomSeparator text="Additional Information" />

        <SecondRow form={form} />

        <SlideContent text="Submit more information">
          <CustomSeparator text="Submit more information" />
          <AdditionalInfo form={form} />
        </SlideContent>

        <SlideContent text="Features">
          <CustomSeparator text="Features" />
          <ThirdRow form={form} />
        </SlideContent>

        <CustomSeparator text="Comment" />
        <ForthRow form={form} />

        <CustomSeparator text="Images" />
        <ImageUpload images={images} setImages={setImages} />

        <CustomSeparator text="Contacts" />
        <FinalRow form={form} />

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
