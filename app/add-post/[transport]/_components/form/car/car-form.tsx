"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { useMemo, useState, useTransition } from "react";

import { carFormSchema } from "@/schema/zod-schema";

import { CustomSeparator } from "@/components/ui/custom-separator";
import { CarMoreItemsModal } from "./car-more-items-modal";
import { ArrowDownFromLine } from "lucide-react";
import { FirstRow } from "./first-row";
import { SecondRow } from "./second-row";
import { ThirdRow } from "./third-row";
import { ForthRow } from "./forth-row";
import { ImageUpload } from "../image-upload";
import { CarBrandApi, FullCarType, imagesType } from "@/types";
import { FinalRow } from "./final-row";
import { usePost } from "@/store/store";
import { useRouter } from "next/navigation";
import { transformCurrentCarToDefaultValues } from "@/utils/transformDefaultvalues";

interface AddCarProps {
  initialCars: CarBrandApi[];
  currentCar?: FullCarType;
}
export const CarForm = ({ initialCars, currentCar }: AddCarProps) => {
  const [images, setImages] = useState<imagesType[] | []>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const cars = useMemo(() => initialCars, [initialCars]);

  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: currentCar
      ? transformCurrentCarToDefaultValues(currentCar)
      : undefined,
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

        <CarMoreItemsModal form={form}>
          <Button type="button">
            Submit additional information{" "}
            <ArrowDownFromLine className="ml-2" size={12} />
          </Button>
        </CarMoreItemsModal>

        <CustomSeparator text="Features" />
        <ThirdRow form={form} />

        <CustomSeparator text="Comment" />
        <ForthRow form={form} />

        <CustomSeparator text="Images" />
        <ImageUpload images={images} setImages={setImages} />

        <CustomSeparator text="Contacts" />
        <FinalRow form={form} />

        <footer className="py-10">
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
