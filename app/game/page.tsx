import { Container } from "@/components/Container";
import { GameData } from "@/components/GameData";

export default function GamePage() {
  return (
    <Container className="py-4">
      <h1 className="text-2xl font-bold tracking-tight">Helpdesk</h1>
      <GameData />
    </Container>
  );
}
