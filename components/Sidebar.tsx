"use client";

import { logout } from "@/app/actions/auth";
import { createMemo } from "@/app/actions/memo";
import { EllipsisVertical, LogOut, Plus, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MemoItem from "./MemoItem";

export function Sidebar({ user, memos }: { user: any; memos: any[] }) {
  const router = useRouter();
  const params = useParams();
  const currentMemoId = params?.memoId as string;

  const [optimisticMemos, setOptimisticMemos] = useState(memos);
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setOptimisticMemos(memos);
  }, [memos]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCreate = async () => {
    try {
      const result = await createMemo();
      if (result.success && result.memoId) {
        router.push(`/${result.memoId}`);
        router.refresh();
      }
    } catch (error) {
      console.error("메모 생성 실패:", error);
    }
  };

  if (!isMounted) return null;

  const rootMemos = optimisticMemos.filter((m) => !m.parentId);

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 hidden md:flex flex-col h-screen relative z-20">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="p-2 flex items-center justify-center">
          <form action={handleCreate} className="flex flex-1">
              <button className="flex flex-row items-center gap-2 flex-1 hover:bg-gray-200 p-2 rounded transition text-gray-500 hover:text-gray-900">
                <Plus size={16} />
                <span className="text-md font-bold">메모 추가</span>
              </button>
          </form>
        </div>
        <hr className="border-gray-200" />
        <div className="flex-1 overflow-y-auto p-2">
          {rootMemos.length === 0 ? (
            <p className="text-xs text-gray-400 text-center mt-10">
              메모가 없습니다.
            </p>
          ) : (
            rootMemos.map((memo) => (
              <MemoItem
                key={memo.id}
                memo={memo}
                allMemos={optimisticMemos}
                depth={0}
                activeId={currentMemoId}
              />
            ))
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 p-2 relative bg-gray-50">
        {isProfileOpen && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsProfileOpen(false)} 
          />
        )}
        {isProfileOpen && (
          <div className="absolute bottom-full left-0 w-full mb-2 px-2 z-40">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden px-1 py-2">
              <Link href="/settings" className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition rounded-lg">
                <Settings size={16} />
                <span>프로필 설정</span>
              </Link>
              <hr className="my-1 border-gray-200" />
              <form action={logout}>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition rounded-lg">
                  <LogOut size={16} />
                  <span>로그아웃</span>
                </button>
              </form>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-200 transition text-left group"
        >
          <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
            {user.username.slice(0, 1).toUpperCase()}
          </div>
          <span className="flex-1 text-lg font-medium text-gray-700 truncate group-hover:text-gray-900">
            {user.username}
          </span>
          <EllipsisVertical size={14} className="text-gray-400 group-hover:text-gray-600" />
        </button>
      </div>
    </aside>
  );
}