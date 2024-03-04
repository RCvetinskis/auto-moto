"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { Form } from "@/components/ui/form";

import { useEffect, useState, useTransition } from "react";

import { searchFormSchema } from "@/schema/zod-schema";
import { useRouter } from "next/navigation";

import FirstRow from "./first-row";
import {
  getCarBrands,
  getMotorcycleBrands,
} from "@/actions/fetch/transport-api-action";
import { ArrowDown, Search } from "lucide-react";

export const SearchForm = ({
  currentTransport,
}: {
  currentTransport: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [brands, setBrands] = useState([]);

  //   TODO: Add more search inputs

  useEffect(() => {
    const fetchData = async () => {
      if (currentTransport === "auto") {
        try {
          const data = await getCarBrands();
          setBrands(data);
        } catch (error) {
          console.log("ERROR_ACTION, useEffect", error);
        }
      } else if (currentTransport === "moto") {
        try {
          const data = await getMotorcycleBrands();
          setBrands(data);
        } catch (error) {
          console.log("ERROR_ACTION, useEffect", error);
        }
      }
    };

    fetchData();
  }, [currentTransport]);

  const form = useForm<z.infer<typeof searchFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(searchFormSchema),
  });

  function onSubmit(data: z.infer<typeof searchFormSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FirstRow
          form={form}
          currentTransport={currentTransport}
          brands={brands}
        />

        <footer className="py-10 flex gap-3 items-center ">
          {/* TODO: modal for advanced search */}
          <Button
            disabled={isPending}
            type="button"
            size={"lg"}
            variant={"outline"}
            className="w-full flex gap-2 items-center "
          >
            Advanced Search
            <ArrowDown size={16} />
          </Button>
          <Button
            disabled={isPending}
            type="submit"
            size={"lg"}
            className="w-full flex gap-3 items-center "
          >
            <Search size={16} />
            Search
          </Button>
        </footer>
      </form>
    </Form>
  );
};
