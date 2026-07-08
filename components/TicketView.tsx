"use client";

import { Ticket } from "@/lib/game/tickets";
import { AuthorLine } from "./AuthorLine";
import { TicketForm } from "./TicketForm";
import { TicketResolution } from "./TicketResolution";
import { TicketCountdown } from "./TicketCountdown";
import { TicketMessage } from "./TicketMessage";

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

        <TicketMessage variant="question">{ticket.question}</TicketMessage>

        {ticket.answer && (
          <TicketMessage variant="answer">{ticket.answer}</TicketMessage>
        )}

        <div className="mt-auto flex flex-col gap-4">
          <TicketResolution ticket={ticket} />
          <TicketForm ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
