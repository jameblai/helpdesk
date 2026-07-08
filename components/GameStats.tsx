"use client";

import { useGame } from "@/lib/game";
import { Card, CardContent } from "./ui/card";
import { useMemo } from "react";
import { formatDuration } from "@/lib/format";

export function GameStats() {
  const game = useGame();

  const openTickets = useMemo(() => {
    return game.tickets.filter((t) => t.status === "open");
  }, [game.tickets]);

  const successfulTickets = useMemo(() => {
    return game.tickets.filter((t) => t.status === "success");
  }, [game.tickets]);

  const failedTickets = useMemo(() => {
    return game.tickets.filter((t) => t.status === "failed");
  }, [game.tickets]);

  const duration = useMemo(() => {
    return game.now - game.startedAt;
  }, [game.now, game.startedAt]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardContent className="flex flex-col gap-1">
          <p>Open tickets</p>
          <p className="text-2xl font-semibold tabular-nums">
            {openTickets.length}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <p>Successful tickets</p>
          <p className="text-2xl font-semibold tabular-nums">
            {successfulTickets.length}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <p>Failed tickets</p>
          <p className="text-2xl font-semibold tabular-nums">
            {failedTickets.length}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <p>Reputation</p>
          <p className="text-2xl font-semibold tabular-nums">
            {game.reputation.toFixed(2)}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-1">
          <p>Duration</p>
          <p className="text-2xl font-semibold tabular-nums">
            {formatDuration(duration)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
