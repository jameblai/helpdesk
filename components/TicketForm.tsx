"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useGame } from "@/lib/game";
import { Ticket } from "@/lib/game/tickets";
import { cn } from "@/lib/utils";

export function TicketForm({ ticket }: { ticket: Ticket }) {
  const game = useGame();
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (isSubmitting || ticket.status !== "open") return;

    const trimmed = answer.trim();
    if (!trimmed) return;

    setIsSubmitting(true);

    try {
      await game.submitAnswer(ticket.id, answer);
      setAnswer("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={cn("flex items-center gap-2", isSubmitting && "animate-pulse")}
    >
      <Input
        type="text"
        name="answer"
        placeholder="Your message..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={isSubmitting || ticket.status !== "open"}
      />
      <Button
        type="submit"
        disabled={isSubmitting || ticket.status !== "open" || !answer.trim()}
      >
        Send
      </Button>
    </form>
  );
}
