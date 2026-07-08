"use client";

import { useGame } from "@/lib/game";
import { useEffect } from "react";

export const TICK_INTERVAL = 250;

export function GameLoop() {
  const tick = useGame((state) => state.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [tick]);

  return null;
}
