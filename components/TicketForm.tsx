"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useGame } from "@/lib/game";
import type { Ticket } from "@/lib/game/tickets";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  answer: z.string().trim().min(1).max(255),
});

export function TicketForm({ ticket }: { ticket: Ticket }) {
  const submitAnswer = useGame((state) => state.submitAnswer);

  const form = useForm({
    defaultValues: {
      answer: "",
    },
    validators: {
      onChange: formSchema,
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (ticket.status !== "open") {
        toast.error("This ticket is no longer open.");
        return;
      }

      try {
        await submitAnswer(ticket.id, value.answer);
        form.reset();
        toast.success("Reply sent.");
      } catch (error) {
        toast.error("Could not send reply.", {
          description:
            error instanceof Error ? error.message : "Please try again.",
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="flex items-start gap-2"
    >
      <form.Field name="answer">
        {(field) => {
          return (
            <div className="min-w-0 flex-1">
              <Input
                id={field.name}
                type="text"
                name={field.name}
                placeholder="Your message..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={ticket.status !== "open"}
              />
            </div>
          );
        }}
      </form.Field>

      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
        })}
      >
        {({ canSubmit, isSubmitting }) => (
          <Button
            type="submit"
            className={cn(isSubmitting && "animate-pulse")}
            disabled={isSubmitting || ticket.status !== "open" || !canSubmit}
          >
            {isSubmitting ? "Sending..." : "Send"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
