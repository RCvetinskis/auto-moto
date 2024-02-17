"use client";
import { serviceData } from "@/lib/service-data";
import { usePost } from "@/store/store";
import { useEffect, useMemo, useState, useTransition } from "react";
import { ServiceCard, ServiceCardSkeleton } from "./service-card";
import { PostCard, PostCardSkeleton } from "./post-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { onPostCar } from "@/actions/car-action";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export const ServiceContainer = ({
  transportType,
}: {
  transportType: string;
}) => {
  const { addService, post, removeAll } = usePost((state) => state);

  const [data, setData] = useState(serviceData);
  const [selected, setSelected] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const defaultService = "premium";
    handleServiceSelect(defaultService);
  }, []);
  const handleServiceSelect = (serviceName: string) => {
    setSelected((prevSelected) => {
      if (prevSelected === serviceName) return prevSelected;
      const updatedServices = serviceName;

      return updatedServices;
    });
    const selectedIndex = data.findIndex(
      (service) => service.service === serviceName
    );

    const clonedServiceData = [...data];
    const selectedService = clonedServiceData.splice(selectedIndex, 1)[0];
    const middleIndex = Math.floor(clonedServiceData.length / 2);
    clonedServiceData.splice(middleIndex, 0, selectedService);
    setData(clonedServiceData);
  };

  const selectedService = useMemo(
    () => serviceData.find((service) => service.service === selected),
    [serviceData, selected]
  );

  const price = useMemo(() => {
    return selectedService
      ? selectedService.options.map((option) => option.price)
      : null;
  }, [selectedService]);

  const handleContinueToPayment = () => {
    if (!selected) return;
    startTransition(() => {
      addService(selected);
      router.push(`/add-post/${transportType}/service/payment`);
    });
  };

  const handlePost = () => {
    const { data, images } = post;
    if (data && isLoaded && isSignedIn) {
      startTransition(() => {
        onPostCar(data, images)
          .then(() => {
            router.replace(`/user/${user?.username}/posts`);
            removeAll();
          })
          .catch((error) => toast.error(error.message));
      });
    }
  };
  return (
    <main className="container space-y-8">
      <header className="grid space-y-8 lg:space-y-0  px-4 md:px-0 mt-5  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((service) => (
          <ServiceCard
            key={service.service}
            item={service}
            isSelected={selected === service.service}
            onSelect={() => handleServiceSelect(service.service)}
          />
        ))}
      </header>

      <section className="py-4">
        <PostCard />
      </section>

      <footer className="flex justify-end items-center gap-5 py-4">
        <p className="font-bold">{price}</p>
        {selectedService?.service === "free" ? (
          <Button
            disabled={isPending}
            onClick={handlePost}
            size={"lg"}
            className="w-[200px]"
          >
            Post
          </Button>
        ) : (
          <Button
            disabled={isPending}
            onClick={handleContinueToPayment}
            size={"lg"}
            className="w-[200px]"
          >
            Payment
          </Button>
        )}
      </footer>
    </main>
  );
};

export const ServiceContainerSkeleton = () => {
  return (
    <main className="container space-y-8">
      <header className="grid space-y-8 lg:space-y-0  px-4 md:px-0 mt-5  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </header>

      <section className="py-4">
        <PostCardSkeleton />
      </section>

      <footer className="flex justify-end items-center gap-5 py-4">
        <Skeleton className="w-[100px] h-[20px] bg-gray-500" />
        <Skeleton className="w-[200px] h-[40px] bg-gray-500" />
      </footer>
    </main>
  );
};
