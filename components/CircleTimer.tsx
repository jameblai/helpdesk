"use client";

interface CircleTimerProps {
  durationMs: number;
  remainingMs: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
}

export function CircleTimer({
  durationMs,
  remainingMs,
  size = 32,
  strokeWidth = 2,
  showText = true,
}: CircleTimerProps) {
  const progress =
    durationMs <= 0 ? 0 : Math.max(0, Math.min(1, remainingMs / durationMs));

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const secondsLeft = Math.ceil(remainingMs / 1000);

  if (durationMs <= 0 || remainingMs < 0) return null;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      {showText && (
        <span className="absolute text-xs tabular-nums">{secondsLeft}</span>
      )}
    </div>
  );
}
