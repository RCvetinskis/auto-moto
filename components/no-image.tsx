import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  width: number;
  height: number;
  classname?: string;
};
const NoImage = ({ width, height, classname }: Props) => {
  return (
    <Image
      src={"/no_image.jpg"}
      width={width}
      height={height}
      className={cn("rounded-xl", classname)}
      alt="no-img"
    />
  );
};

export default NoImage;
