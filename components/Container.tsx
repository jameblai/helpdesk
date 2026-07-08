import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-4xl flex-col gap-4 px-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
