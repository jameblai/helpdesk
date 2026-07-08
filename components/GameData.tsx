"use client";

import { useGame } from "@/lib/game";

export function GameData() {
  const game = useGame();
  return (
    <pre className="border p-2 whitespace-pre-wrap" suppressHydrationWarning>
      {JSON.stringify(game, null, 2)}
    </pre>
  );
}
