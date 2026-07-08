import { GameLoop } from "./GameLoop";
import { GameSidebar } from "./GameSidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameLoop />
      <SidebarProvider>
        <GameSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
