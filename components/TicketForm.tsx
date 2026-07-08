"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useGame } from "@/lib/game";
import { Id } from "@/lib/id";

export function TicketForm({ ticketId }: { ticketId: Id }) {
  const game = useGame();
  const [answer, setAnswer] = useState("");

  async function handleSubmit() {
    await game.submitAnswer(ticketId, answer);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex gap-2 items-center"
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
