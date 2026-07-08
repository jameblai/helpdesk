"use client";

import { Container } from "@/components/Container";
import { TicketView } from "@/components/TicketView";
import { useGame } from "@/lib/game";
import { use, useMemo } from "react";

export default function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = use(params);
  const game = useGame();
  const ticket = useMemo(
    () => game.tickets.find((t) => t.id === ticketId),
    [game.tickets, ticketId],
  );

  if (!ticket) return null;

  return (
    <Container className="py-4">
      <TicketView ticket={ticket} />
    </Container>
  );
}
