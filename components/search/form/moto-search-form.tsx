"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { motoSearchFormSchema } from "@/schema/zod-schema";
import { useRouter } from "next/navigation";

import { ArrowDown, Search } from "lucide-react";

import MotoInputs from "./moto-inputs";

type Props = {
  data: string[];
  currentTransport: string;
};
export const MotoSearchForm = ({ currentTransport, data: brands }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof motoSearchFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(motoSearchFormSchema),
  });

  function onSubmit(data: z.infer<typeof motoSearchFormSchema>) {
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
        <MotoInputs
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
            Search
          </Button>
        </footer>
      </form>
    </Form>
  );
};
