"use client";

import { Ticket } from "@/lib/game/tickets";
import { AuthorLine } from "./AuthorLine";
import { TicketForm } from "./TicketForm";
import { TicketResolution } from "./TicketResolution";
import { TicketCountdown } from "./TicketCountdown";

export function TicketView({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <AuthorLine author={ticket.author} />
            <h2 className="text-2xl font-bold tracking-tight">
              {ticket.subject}
            </h2>
          </div>

          {ticket.status === "open" && <TicketCountdown ticket={ticket} />}
        </div>

        <p className="bg-primary text-primary-foreground max-w-2xl self-start border border-transparent px-2.5 py-2 text-sm">
          {ticket.question}
        </p>

        {ticket.answer && (
          <p className="bg-secondary text-secondary-foreground max-w-2xl self-end border px-2.5 py-2 text-sm">
            {ticket.answer}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-4">
          <TicketResolution ticket={ticket} />
          <TicketForm ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
