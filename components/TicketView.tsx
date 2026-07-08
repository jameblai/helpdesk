"use client";

import { Ticket } from "@/lib/game/tickets";
import { AuthorLine } from "./AuthorLine";
import { TicketForm } from "./TicketForm";
import { TicketResolution } from "./TicketResolution";
import { CircleTimer } from "./CircleTimer";
import { useGame } from "@/lib/game";

export function TicketView({ ticket }: { ticket: Ticket }) {
  const now = useGame((s) => s.now);

  return (
    <div className="flex flex-col gap-6">
      <TicketResolution ticket={ticket} />

      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-4">
            <AuthorLine author={ticket.author} />
            <h2 className="text-2xl font-bold tracking-tight">
              {ticket.subject}
            </h2>
          </div>

          <CircleTimer
            durationMs={ticket.dueAt - ticket.createdAt}
            remainingMs={ticket.dueAt - now}
          />
        </div>

        <p className="bg-primary text-primary-foreground max-w-2xl self-start border px-2.5 py-2 text-sm">
          {ticket.body}
        </p>

        {ticket.answer && (
          <p className="bg-secondary text-secondary-foreground max-w-2xl self-end border px-2.5 py-2 text-sm">
            {ticket.answer}
          </p>
        )}
        <TicketForm ticket={ticket} />
      </div>
    </div>
  );
}
