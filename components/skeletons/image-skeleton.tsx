import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const ImageSkeleton = ({ className }: Props) => {
  return (
    <Skeleton className={cn("bg-gray-400 border-rounded", className)}>
      ImageSkeleton
    </Skeleton>
  );
};

export default ImageSkeleton;
