"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { carSearchFormSchema } from "@/schema/zod-schema";
import { useRouter } from "next/navigation";
import { ArrowDown, Search } from "lucide-react";
import CarInputs from "./car-inputs";
import { useEffect, useState } from "react";
import { getCarsSearchCount } from "@/actions/car-action";

type Props = {
  data: string[];
  currentTransport: string;
};
export const CarSearchForm = ({ currentTransport, data: brands }: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof carSearchFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(carSearchFormSchema),
  });

  const [searchLength, setSearchLength] = useState(0);

  //   TODO: SEARCH LENGTH FOR MOTORCYCLES
  //   TODO: SEARCH PAGE DISPLAY CAR CARDS AND MOTORCYCLES
  const { brand, model, yearFrom, yearTill, priceFrom, priceTill, fuel, body } =
    form.watch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCarsSearchCount(
        brand,
        model,
        yearFrom,
        yearTill,
        priceFrom,
        priceTill,
        fuel,
        body
      );
      setSearchLength(data);
    };
    fetchData();
  }, [
    brand,
    model,
    yearFrom,
    yearTill,
    priceFrom,
    priceTill,
    fuel,
    body,
    brands,
  ]);

  function onSubmit(data: z.infer<typeof carSearchFormSchema>) {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.append(key, value.toString());
      }
    });

    const searchQuery = params.toString();

    router.push(`/posts?${searchQuery}&transport=${currentTransport}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CarInputs
          form={form}
          currentTransport={currentTransport}
          brands={brands}
        />

        <footer className=" flex gap-3 items-center pt-5 ">
          {/* TODO: modal for advanced search */}
          <Button
            type="button"
            variant={"outline"}
            className="flex-1 flex gap-2 items-center "
          >
            Advanced Search
            <ArrowDown size={16} />
          </Button>
          <Button type="submit" className="flex-1 flex gap-3 items-center ">
            <Search size={16} />
            Search ({searchLength})
          </Button>
        </footer>
      </form>
    </Form>
  );
};
