"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown, FileText, Plus } from "lucide-react";
import { createMemo } from "@/app/actions/memo";

interface MemoProps {
  memo: any;
  allMemos: any[];
  depth: number;
  activeId: string | null;
}

export default function MemoItem({ memo, allMemos, depth, activeId }: MemoProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const childMemos = allMemos.filter((m) => m.parentId === memo.id);
  const hasChildren = childMemos.length > 0;

  const handleCreateChild = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const res = await createMemo(memo.id);
    if (res.success && res.memoId) {
      setIsOpen(true);
      router.push(`/${res.memoId}`);
    }
  };

  return (
    <div>
      <Link
        href={`/${memo.id}`}
        className={`flex items-center gap-1 py-1 pr-2 rounded-md transition group ${
          activeId === memo.id ? "text-blue-700 hover:bg-blue-100" : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
          className={`p-0.5 rounded-sm hover:bg-gray-300 ${!hasChildren && "invisible"}`}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>

        <FileText size={16} />
        <span className="truncate flex-1 text-md">{memo.title || "제목 없음"}</span>

        <button
          onClick={handleCreateChild}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-300 rounded"
          title="하위 페이지 만들기"
        >
          <Plus size={14} />
        </button>
      </Link>

      {isOpen && hasChildren && (
        <div>
          {childMemos.map((child: any) => (
            <MemoItem
              key={child.id}
              memo={child}
              allMemos={allMemos}
              depth={depth + 1}
              activeId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}