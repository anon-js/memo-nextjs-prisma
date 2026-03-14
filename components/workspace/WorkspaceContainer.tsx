'use client';

import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export default function WorkspaceContainer({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();

  return (
    <main
      className={cn(
        "flex-1 h-full transition-all duration-300 ease-in-out z-10",
        "ml-0",
        isSidebarOpen ? "md:ml-84" : "md:ml-0"
      )}
    >
      <div className="h-full bg-white overflow-hidden">
        {children}
      </div>
    </main>
  );
}