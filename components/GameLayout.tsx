import { GameLoop } from "./GameLoop";
import { GameSidebar } from "./GameSidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import { GameTopBar } from "./GameTopBar";

export function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GameLoop />
      <SidebarProvider>
        <GameSidebar />
        <SidebarInset>
          <GameTopBar />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
