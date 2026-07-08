"use client";

import { memo } from "react";
import { useGame } from "@/lib/game";
import { Ticket } from "@/lib/game/tickets";
import { CircleTimer } from "./CircleTimer";

interface TicketCountdownProps {
  ticket: Ticket;
  showText?: boolean;
  size?: number;
}

export const TicketCountdown = memo(function TicketCountdown({
  ticket,
  showText = true,
  size,
}: TicketCountdownProps) {
  const now = useGame((state) => state.now);

  return (
    <CircleTimer
      durationMs={ticket.dueAt - ticket.createdAt}
      remainingMs={ticket.dueAt - now}
      showText={showText}
      size={size}
    />
  );
});
