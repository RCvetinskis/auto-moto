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

import { CarBrandApi, FullCarType } from "@/types";
import { FinalRow } from "./final-row";

import { transformCurrentCarToDefaultValues } from "@/utils/transformDefaultvalues";
import { ImageUpdate } from "../image-update";
import AdditionalInfo from "./additional-info";
import { SlideContent } from "@/components/modals/slide-content";
import { Images } from "@prisma/client";

import { onEditCar } from "@/actions/car-action";
import { toast } from "sonner";

import DeletePostModal from "@/components/modals/delete-post-modal";

interface AddCarProps {
  initialCars: CarBrandApi[];
  currentCar: FullCarType;
}
export const CarFormUpdate = ({ initialCars, currentCar }: AddCarProps) => {
  const [images, setImages] = useState<Images[] | []>(currentCar.images || []);
  const [isPending, startTransition] = useTransition();

  const cars = useMemo(() => initialCars, [initialCars]);

  const defaultValues = transformCurrentCarToDefaultValues(currentCar);
  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<typeof carFormSchema>) {
    startTransition(() => {
      onEditCar(currentCar.id, data, images)
        .then((res) => toast.success(`${res.brand} updates sucessfully!`))
        .catch((e) => toast.error("Something went wrong!"));
    });
  }

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
        <ImageUpdate images={images} setImages={setImages} />

        <CustomSeparator text="Contacts" />
        <FinalRow form={form} />

        <footer className="py-10 flex items-center gap-3">
          <DeletePostModal
            postId={currentCar.id}
            title={`${currentCar.brand} ${currentCar.model}`}
            classname="w-full"
            variant="destructive"
            size="lg"
          />

          <Button
            disabled={isPending}
            type="submit"
            size={"lg"}
            className="w-full  "
          >
            Update
          </Button>
        </footer>
      </form>
    </Form>
  );
};
