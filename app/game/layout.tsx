"use client";

import { GameLoop } from "@/components/GameLoop";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GameLoop />
      {children}
    </>
  );
}
