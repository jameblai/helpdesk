"use client";

import { useGame } from "@/lib/game";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Link from "next/link";
import { memo } from "react";
import { IconLifebuoy } from "@tabler/icons-react";
import { TicketCountdown } from "./TicketCountdown";

const OpenTicketMenuItem = memo(function OpenTicketMenuItem({
  ticketId,
}: {
  ticketId: string;
}) {
  const ticket = useGame((state) => state.ticketsById[ticketId]);
  if (!ticket) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={
          <Link href={`/${ticket.id}`} className="flex items-center gap-4">
            <span className="truncate">{ticket.subject}</span>
            <TicketCountdown ticket={ticket} showText={false} size={16} />
          </Link>
        }
      />
    </SidebarMenuItem>
  );
});

const ClosedTicketMenuItem = memo(function ClosedTicketMenuItem({
  ticketId,
}: {
  ticketId: string;
}) {
  const ticket = useGame((state) => state.ticketsById[ticketId]);
  if (!ticket) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={
          <Link href={`/${ticket.id}`} className="flex items-center gap-4">
            <span className="truncate">{ticket.subject}</span>
          </Link>
        }
      />
    </SidebarMenuItem>
  );
});

export function GameSidebar() {
  const openTicketIds = useGame((state) => state.openTicketIds);
  const closedTicketIds = useGame((state) => state.closedTicketIds);

  return (
    <Sidebar>
      <SidebarHeader className="bg-sidebar p-4">
        <Link
          href="/"
          className="flex w-min items-center gap-1 leading-none font-semibold tracking-tight"
        >
          <IconLifebuoy className="size-5" />
          Helpdesk
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Open tickets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {openTicketIds.map((ticketId) => (
                <OpenTicketMenuItem key={ticketId} ticketId={ticketId} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Closed tickets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {closedTicketIds.map((ticketId) => (
                <ClosedTicketMenuItem key={ticketId} ticketId={ticketId} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
