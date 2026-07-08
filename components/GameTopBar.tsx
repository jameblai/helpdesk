import { IconLayoutSidebar } from "@tabler/icons-react";
import { SidebarTrigger } from "./ui/sidebar";

export function GameTopBar() {
  return (
    <div className="border-b p-2">
      <SidebarTrigger>
        <IconLayoutSidebar />
        <span className="sr-only">Toggle Sidebar</span>
      </SidebarTrigger>
    </div>
  );
}
