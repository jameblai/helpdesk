"use client";

import { useGame } from "@/lib/game";
import { Card, CardContent } from "./ui/card";
import { formatDuration } from "@/lib/format";

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <p className="text-muted-foreground leading-none">{label}</p>
        <p className="text-2xl leading-none font-medium tabular-nums">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function DurationStatCard({ startedAt }: { startedAt: number }) {
  const now = useGame((state) => state.now);
  const duration = now - startedAt;

  return <StatCard label="Duration" value={formatDuration(duration)} />;
}

export function GameStats() {
  const stats = useGame((state) => state.stats);
  const startedAt = useGame((state) => state.startedAt);

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <StatCard label="Open tickets" value={stats.openTickets} />
      <StatCard label="Successful tickets" value={stats.successfulTickets} />
      <StatCard label="Failed tickets" value={stats.failedTickets} />
      <StatCard label="Reputation" value={`${stats.reputation.toFixed(2)}%`} />
      <DurationStatCard startedAt={startedAt} />
    </div>
  );
}
