import { Ticket } from "./tickets";

export function calculateReputation(tickets: Ticket[]): number {
  const successfulTickets = tickets.filter(
    (ticket) => ticket.status === "success",
  ).length;
  const failedTickets = tickets.filter(
    (ticket) => ticket.status === "failed",
  ).length;
  const resolvedTickets = successfulTickets + failedTickets;

  if (resolvedTickets === 0) return 100; // no resolved tickets yet, full reputation

  return Math.floor((successfulTickets / resolvedTickets) * 100);
}
