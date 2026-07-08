import { Ticket } from "@/lib/game/tickets";

export function TicketData({ ticket }: { ticket: Ticket }) {
  return (
    <pre
      className="border bg-black p-2 whitespace-pre-wrap text-white"
      suppressHydrationWarning
    >
      {JSON.stringify(ticket, null, 2)}
    </pre>
  );
}
