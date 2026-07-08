import { Container } from "@/components/Container";
import { GameStats } from "@/components/GameStats";

export default function GamePage() {
  return (
    <Container className="py-4 md:py-8">
      <GameStats />
    </Container>
  );
}
