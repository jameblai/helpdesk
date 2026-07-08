"use client";

import { Container } from "@/components/Container";
import { TicketView } from "@/components/TicketView";
import { useGame } from "@/lib/game";
import { redirect } from "next/navigation";
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

  if (!ticket) return redirect("/");

  return (
    <Container className="py-4 md:py-8">
      <TicketView ticket={ticket} />
    </Container>
  );
}
