import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ServiceDataOptionsType } from "@/types";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceCardProps {
  item: ServiceDataOptionsType;
  isSelected: boolean;
  onSelect: (serviceName: any) => void;
}
export const ServiceCard = ({
  item,
  isSelected,
  onSelect,
}: ServiceCardProps) => {
  return (
    <Card
      className={cn(
        "w-full sm:w-[80%] md:w-[90%] cursor-pointer transform duration-300 hover:shadow-3xl transition-all ease-in-out ",
        isSelected && "scale-105 shadow-3xl"
      )}
      onClick={onSelect}
    >
      <CardHeader className="text-center">
        <CardTitle className="capitalize text-2xl">{item.service}</CardTitle>
        <CardDescription>
          {item.service === "premium"
            ? "Recommend"
            : item.service === "regular"
            ? "Meh"
            : "It's Free!"}
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {item.options.map((option, i) => (
          <div key={i}>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start">
              <span className=" h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {option.adPlacement}
                  {option.adTime}
                  {option.adHighlight}
                  {option.discount}
                  {option.initialPrice}
                  {option.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Checkbox checked={isSelected} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ServiceCardSkeleton = () => {
  return (
    <Card className="w-full sm:w-[80%] md:w-[90%] transform">
      <div className="max-w-fit w-full mx-auto p-4 space-y-4">
        <Skeleton className="w-[120px] h-[20px] bg-gray-500" />

        <Skeleton className="w-[120px] h-[20px] bg-gray-500" />
      </div>

      <CardContent className="grid gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start">
              <Skeleton className=" h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
              <div className="space-y-1">
                <div className="leading-none">
                  <Skeleton className="w-[100px] h-[10px] bg-gray-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Skeleton className="w-full h-[35px] bg-gray-500 " />
      </CardFooter>
    </Card>
  );
};
