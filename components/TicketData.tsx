import { Ticket } from "@/lib/game/tickets";

export function TicketData({ ticket }: { ticket: Ticket }) {
  return (
    <pre
      className="bg-foreground text-background p-2 whitespace-pre-wrap"
      suppressHydrationWarning
    >
      {JSON.stringify(ticket, null, 2)}
    </pre>
  );
}
