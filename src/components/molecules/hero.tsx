import { cn } from "@/lib/utils";

export default function Hero({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center h-screen p-4 sm:p-8 md:p-10 lg:p-14",
        className
      )}
    >
      {children}
    </div>
  );
}
