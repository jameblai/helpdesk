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
import { useMemo } from "react";

export function GameSidebar() {
  const game = useGame();

  const openTickets = useMemo(
    () => game.tickets.filter((ticket) => ticket.status === "open"),
    [game.tickets],
  );

  const closedTickets = useMemo(
    () => game.tickets.filter((ticket) => ticket.status !== "open"),
    [game.tickets],
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-sidebar border-b p-4">
        <Link
          href="/"
          className="w-min leading-none font-semibold tracking-tight"
        >
          Helpdesk
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Open tickets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {openTickets.map((ticket) => {
                return (
                  <SidebarMenuItem key={ticket.id}>
                    <SidebarMenuButton
                      render={
                        <Link href={`/${ticket.id}`} className="truncate">
                          {ticket.subject}
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Closed tickets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {closedTickets.map((ticket) => {
                return (
                  <SidebarMenuItem key={ticket.id}>
                    <SidebarMenuButton
                      render={
                        <Link href={`/${ticket.id}`} className="truncate">
                          {ticket.subject}
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
