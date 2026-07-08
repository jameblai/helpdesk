import { Ticket } from "@/lib/game/tickets";
import {
  IconCircleCheck,
  IconCircleX,
  IconClockExclamation,
  type TablerIcon,
} from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

function getResolution(ticket: Ticket): {
  title: string;
  description: string;
  icon: TablerIcon;
} | null {
  if (ticket.status === "failed" && !ticket.judgement) {
    return {
      title: "Ticket Expired",
      description: "User did not provide an answer within the allotted time.",
      icon: IconClockExclamation,
    };
  }

  if (ticket.judgement) {
    return {
      title: ticket.judgement.passed ? "Passed" : "Failed",
      description: ticket.judgement.feedback,
      icon: ticket.judgement.passed ? IconCircleCheck : IconCircleX,
    };
  }

  return null;
}

export function TicketResolution({ ticket }: { ticket: Ticket }) {
  const resolution = getResolution(ticket);

  if (!resolution) return null;
  const { title, description, icon: Icon } = resolution;

  return (
    <Alert>
      <Icon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
