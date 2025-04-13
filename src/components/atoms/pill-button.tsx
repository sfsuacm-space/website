import { cn } from "@/lib/utils";
import { JSX } from "react";

interface PillButtonProps {
  actionText: string;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PillButton = ({
  actionText,
  iconRight,
  onClick,
  className,
}: PillButtonProps): JSX.Element => {
  return (
    <button
      className={cn(
        `w-50 h-16 rounded-xl cursor-pointer group text-base bg-black  text-white`,
        className
      )}
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-center space-x-1.5 font-semibold mx-2">
        {iconRight && iconRight}
        <p>{actionText}</p>
      </div>
    </button>
  );
};
