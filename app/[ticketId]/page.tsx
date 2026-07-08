"use client";

import { Container } from "@/components/Container";
import { TicketView } from "@/components/TicketView";
import { useGame } from "@/lib/game";
import { redirect } from "next/navigation";
import { use } from "react";

export default function TicketPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = use(params);
  const ticket = useGame((state) => state.ticketsById[ticketId]);

  if (!ticket) return redirect("/");

  return (
    <Container className="flex-1 py-4 md:py-8">
      <TicketView ticket={ticket} />
    </Container>
  );
}
