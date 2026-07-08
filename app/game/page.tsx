import { GameData } from "@/components/GameData";

export default function GamePage() {
  return (
    <main className="max-w-4xl mx-auto p-4 w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Helpdesk</h1>
      <GameData />
    </main>
  );
}
