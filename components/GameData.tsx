"use client";

import { useGame } from "@/lib/game";

export function GameData() {
  const game = useGame();
  return (
    <pre
      className="p-2 bg-foreground text-background whitespace-pre-wrap"
      suppressHydrationWarning
    >
      {JSON.stringify(game, null, 2)}
    </pre>
  );
}
