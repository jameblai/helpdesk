import { Ticket } from "@/lib/game/tickets";
import { AuthorLine } from "./AuthorLine";
import { TicketForm } from "./TicketForm";
import { TicketResolution } from "./TicketResolution";

export function TicketView({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex flex-col gap-6">
      <TicketResolution ticket={ticket} />

      <div className="flex flex-col gap-4">
        <AuthorLine author={ticket.author} />
        <h2 className="text-2xl font-bold tracking-tight">{ticket.subject}</h2>
        <p className="bg-muted p-4">{ticket.body}</p>
        <TicketForm ticket={ticket} />
      </div>
    </div>
  );
}
