"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useGame } from "@/lib/game";
import { Id } from "@/lib/id";
import { Ticket } from "@/lib/game/tickets";

export function TicketForm({ ticket }: { ticket: Ticket }) {
  const game = useGame();
  const [answer, setAnswer] = useState("");

  async function handleSubmit() {
    await game.submitAnswer(ticket.id, answer);
  }

  if (ticket.status !== "open") return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex items-center gap-2"
    >
      <Input
        type="text"
        name="answer"
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
