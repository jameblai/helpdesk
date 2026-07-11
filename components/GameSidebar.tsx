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
import { IconBook2, IconHome, IconLifebuoy } from "@tabler/icons-react";
import { TicketCountdown } from "./TicketCountdown";
import { usePathname, useRouter } from "next/navigation";
import { Id } from "@/lib/id";

function useSelectTicket() {
  const selectTicket = useGame((state) => state.selectTicket);
  const router = useRouter();
  const pathname = usePathname();

  return (ticketId: Id | null) => {
    selectTicket(ticketId);
    if (pathname !== "/") {
      router.push("/");
    }
  };
}

function OpenTicketMenuItem({
  ticketId,
  isActive,
}: {
  ticketId: string;
  isActive: boolean;
}) {
  const selectTicket = useSelectTicket();
  const ticket = useGame((state) => state.ticketsById[ticketId]);
  if (!ticket) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={
          <button
            onClick={() => selectTicket(ticketId)}
            className="flex w-full items-center justify-between gap-4 cursor-pointer"
          >
            <span className="truncate">{ticket.subject}</span>
            <TicketCountdown ticket={ticket} showText={false} size={16} />
          </button>
        }
      />
    </SidebarMenuItem>
  );
}

function ClosedTicketMenuItem({
  ticketId,
  isActive,
}: {
  ticketId: string;
  isActive: boolean;
}) {
  const selectTicket = useSelectTicket();
  const ticket = useGame((state) => state.ticketsById[ticketId]);
  if (!ticket) return null;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={
          <button
            onClick={() => selectTicket(ticketId)}
            className="flex w-full items-center justify-between gap-4 cursor-pointer"
          >
            <span className="truncate">{ticket.subject}</span>
          </button>
        }
      />
    </SidebarMenuItem>
  );
}

export function GameSidebar() {
  const selectTicket = useSelectTicket();
  const openTicketIds = useGame((state) => state.openTicketIds);
  const closedTicketIds = useGame((state) => state.closedTicketIds);
  const pathname = usePathname();
  const selectedTicketId = useGame((state) => state.selectedTicketId);

  return (
    <Sidebar>
      <SidebarHeader className="bg-sidebar p-4">
        <button
          onClick={() => selectTicket(null)}
          className="flex w-min items-center gap-1 leading-none font-semibold tracking-tight cursor-pointer"
        >
          <IconLifebuoy className="size-5" />
          Helpdesk
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={selectedTicketId === null && pathname === "/"}
                  tooltip="Overview"
                  render={
                    <button onClick={() => selectTicket(null)} className="cursor-pointer">
                      <IconHome />
                      <span>Overview</span>
                    </button>
                  }
                />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/manual"}
                  tooltip="Manual"
                  render={
                    <Link href="/manual">
                      <IconBook2 />
                      <span>Manual</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {openTicketIds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Tickets</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {openTicketIds.map((ticketId) => (
                  <OpenTicketMenuItem
                    key={ticketId}
                    ticketId={ticketId}
                    isActive={selectedTicketId === ticketId && pathname === "/"}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        {closedTicketIds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Archive</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {closedTicketIds.map((ticketId) => (
                  <ClosedTicketMenuItem
                    key={ticketId}
                    ticketId={ticketId}
                    isActive={selectedTicketId === ticketId && pathname === "/"}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
