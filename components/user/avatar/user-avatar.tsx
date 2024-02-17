import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../../ui/skeleton";

interface UserAvatarProps {
  image: string;
}
export const UserAvatar = ({ image }: UserAvatarProps) => {
  return (
    <Avatar className="h-7 w-7">
      <AvatarImage src={image ? image : "./default-avatar.png"} />
      <AvatarFallback>
        <Skeleton className="h-7 w-7 bg-gray-500 rounded-full" />
      </AvatarFallback>
    </Avatar>
  );
};

export const UserAvatarSkeleton = () => {
  return <Skeleton className="h-7 w-7 bg-gray-500 rounded-full" />;
};
