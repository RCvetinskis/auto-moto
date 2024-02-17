import { cn } from "@/lib/utils";
import { INavUserBtn } from "@/types";
import Link from "next/link";

interface NavUserDropDownItemProps {
  item: INavUserBtn;
}
export const NavUserDropDownItem = ({ item }: NavUserDropDownItemProps) => {
  const { label, href, onClick, Icon, active } = item;
  return (
    <>
      {href ? (
        <Link
          href={href}
          className={cn(
            "flex items-center gap-2 w-full p-2",
            active && "border-b-2 border-black"
          )}
        >
          <Icon />
          <p>{label}</p>
        </Link>
      ) : (
        <div
          onClick={onClick ? () => onClick() : undefined}
          className="flex items-center gap-2 w-full p-2"
        >
          <Icon />
          <p>{label}</p>
        </div>
      )}
    </>
  );
};
