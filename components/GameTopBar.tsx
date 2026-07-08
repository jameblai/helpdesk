import { IconLayoutSidebar } from "@tabler/icons-react";
import { SidebarTrigger } from "./ui/sidebar";

export function GameTopBar() {
  return (
    <div className="h-[45.5px]">
      <div className="bg-background fixed w-full border-b p-2">
        <SidebarTrigger>
          <IconLayoutSidebar />
          <span className="sr-only">Toggle Sidebar</span>
        </SidebarTrigger>
      </div>
    </div>
  );
}
