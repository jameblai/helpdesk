import { Container } from "@/components/Container";
import { GameStats } from "@/components/GameStats";

export default function GamePage() {
  return (
    <Container className="py-4 md:py-8">
      <article className="prose">
        <h1>Alien Helpdesk</h1>
        <p>
          Keep the helpdesk running by reviewing each incoming ticket before it
          expires.
        </p>
        <ul>
          <li>
            Open a ticket from the sidebar and read the request carefully.
          </li>
          <li>Use the manual to find the correct advice for the situation.</li>
          <li>Submit your response before the countdown ends.</li>
          <li>
            Successful tickets protect your reputation; missed or incorrect
            tickets lower it.
          </li>
        </ul>
      </article>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight">Statistics</h2>
        <GameStats />
      </section>
    </Container>
  );
}
