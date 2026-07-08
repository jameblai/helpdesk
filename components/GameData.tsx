"use client";

import { useGame } from "@/lib/game";

export function GameData() {
  const game = useGame();
  return (
    <pre
      className="bg-foreground text-background p-2 whitespace-pre-wrap"
      suppressHydrationWarning
    >
      {JSON.stringify(game, null, 2)}
    </pre>
  );
}
