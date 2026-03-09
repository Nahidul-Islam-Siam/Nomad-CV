"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavMenu = ({
  className,
  isShowBorder = false,
}: {
  className?: string;
  isShowBorder?: boolean;
}) => {
  const pathname = usePathname();
  return (
    <div className={cn("flex text-base gap-6  font-normal ps-3", className)}>
      <Link href={"/roofing"}>
        <div
          // className="cursor-pointer hover:text-red-primary transition duration-200"
          className={cn(
            "cursor-pointer hover:text-red-primary transition duration-200 ",
            pathname === "/roofing" && "text-red-primary font-semibold"
          )}
        >
          Roofing
        </div>
      </Link>
      {isShowBorder && <div className="h-5 border "></div>}
      <Link href={"/insurance-claim"}>
        <div
          className={cn(
            "cursor-pointer hover:text-red-primary transition duration-200",
            pathname === "/insurance-claim" && "text-red-primary font-semibold"
          )}
        >
          Insurance Claim
        </div>
      </Link>
      {isShowBorder && <div className="h-5 border "></div>}
      <Link href={"/siding"}>
        <div
          className={cn(
            "cursor-pointer hover:text-red-primary transition duration-200",
            pathname === "/sliding" && "text-red-primary font-semibold"
          )}
        >
          Siding
        </div>
      </Link>
      {isShowBorder && <div className="h-5 border "></div>}
      <Link href={"/finance"}>
        <div
          className={cn(
            "cursor-pointer hover:text-red-primary transition duration-200",
            pathname === "/finance" && "text-red-primary font-semibold"
          )}
        >
          Financing
        </div>
      </Link>
      {isShowBorder && <div className="h-5 border "></div>}
    </div>
  );
};

export default NavMenu;
