"use client";

import { createMemo } from "@/app/actions/memo";
import { Button } from "@/components/ui/Button";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { Memo, User } from "@/types";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import MemoList from "./components/MemoList";
import Profile from "./components/Profile";

interface SidebarProps {
  user: User;
  memos: Memo[];
}

export function Sidebar({ user, memos }: SidebarProps) {
  const router = useRouter();
  const params = useParams();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const currentMemoId = params?.memoId as string;

  const [isPending, setIsPending] = useState(false);

  const handleCreate = async () => {
    setIsPending(true);
    try {
      const result = await createMemo();
      if (result.success && result.memoId) {
        router.push(`/${result.memoId}`);
        router.refresh();
        if (window.innerWidth < 768) toggleSidebar();
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out",
          "bg-gray-50 border border-gray-100 rounded-xl m-2 flex flex-col overflow-hidden shadow-xl md:shadow-none",
          "w-[calc(100%-16px)] md:w-80",
          isSidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+16px)]"
        )}
      >
        <div className="w-full p-4">
          <Button
            icon={X}
            iconSize={24}
            onClick={toggleSidebar}
            variant="ghost"
            className="p-1.5 h-fit md:hidden absolute top-4 right-4"
            title="사이드바 닫기"
          />
          <Profile user={user} />
        </div>
        <div className="flex-1 flex flex-col min-h-0 mt-2">
          <div className="flex items-center justify-between ps-4.5 pe-4 mb-2">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">
              최근 메모
            </span>
            <Button
              icon={Plus}
              iconSize={24}
              onClick={handleCreate}
              isLoading={isPending}
              variant="ghost"
              className="p-1.5"
              title="새 메모 작성"
            />
          </div>

          <nav className="flex-1 overflow-y-auto custom-scrollbar" aria-label="메모 목록">
            <MemoList
              memos={memos}
              activeId={currentMemoId}
            />
          </nav>
        </div>
      </aside>
    </>
  );
}