"use client";
import { Container } from "@/components/Container";
import { TicketData } from "@/components/TicketData";
import { TicketForm } from "@/components/TicketForm";
import { useGame } from "@/lib/game";
import { use, useMemo } from "react";

export default function TicketPage({params}: { params: Promise<{ ticketId: string }>}) {
  const {ticketId} = use(params)
  const game = useGame();
  const ticket = useMemo(() => game.tickets.find((t) => t.id === ticketId), [game.tickets, ticketId]);

  if (!ticket) return <Container className="py-4">
    <p>Not found</p>
  </Container>

  return (
    <Container className="py-4">
      <TicketData ticket={ticket} />
      <TicketForm ticket={ticket} />
    </Container>
  );
}
