import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TicketMessageProps = {
  children: ReactNode;
  variant: "question" | "answer";
};

export function TicketMessage({ children, variant }: TicketMessageProps) {
  return (
    <p
      className={cn(
        "max-w-2xl border px-2.5 py-2 text-sm",
        variant === "question" &&
          "bg-primary text-primary-foreground self-start border-transparent",
        variant === "answer" &&
          "bg-secondary text-secondary-foreground self-end",
      )}
    >
      {children}
    </p>
  );
}
