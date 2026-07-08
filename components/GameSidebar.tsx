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

export function GameSidebar() {
  const game = useGame();

  return (
    <Sidebar>
      <SidebarHeader className="px-4 pt-4 pb-0">
        <Link href="/" className="leading-none font-semibold tracking-tight">
          Helpdesk
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tickets</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {game.tickets.map((ticket) => (
                <SidebarMenuItem key={ticket.id}>
                  <SidebarMenuButton
                    render={
                      <Link href={`/${ticket.id}`} className="truncate">
                        {ticket.subject}
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
