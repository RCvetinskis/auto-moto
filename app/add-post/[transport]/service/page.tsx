"use client";

import { useEffect, useState } from "react";
import {
  ServiceContainer,
  ServiceContainerSkeleton,
} from "./_components/service-container";
import { usePost } from "@/store/store";

import { redirect } from "next/navigation";

const ServicePage = ({ params }: { params: { transport: string } }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { post } = usePost((state) => state);

  const transportType = params.transport;

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!post.data) {
    redirect("/add-post");
  }

  if (!isMounted) {
    return <ServiceContainerSkeleton />;
  }

  return (
    <>
      <ServiceContainer transportType={transportType} />
    </>
  );
};

export default ServicePage;
