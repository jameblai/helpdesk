"use client";

import { useGame } from "@/lib/game";
import { useEffect } from "react";

export const TICK_INTERVAL = 250;

export function GameLoop() {
  const assignInitialTicket = useGame((state) => state.assignInitialTicket);
  const tick = useGame((state) => state.tick);

  useEffect(() => {
    assignInitialTicket();

    const interval = setInterval(() => {
      tick();
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [assignInitialTicket, tick]);

  return null;
}
