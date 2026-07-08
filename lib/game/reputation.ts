import { Ticket } from "./tickets";

export function calculateReputation(tickets: Ticket[]): number {
  const totalTickets = tickets.length;
  if (totalTickets === 0) return 100; // no tickets yet, full reputation

  const successfulTickets = tickets.filter(
    (ticket) => ticket.status === "success",
  ).length;
  return Math.floor((successfulTickets / totalTickets) * 100);
}
