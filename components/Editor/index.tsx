"use client";

import { useState, useEffect } from "react";
import { saveMemo, deleteMemo } from "@/app/actions/memo";
import { useRouter } from "next/navigation";
import { Memo } from "@/types";
import { EditorHeader } from "./components/EditorHeader";
import { EditorBody } from "./components/EditorBody";
import { useSidebar } from "@/hooks/useSidebar";

export default function Editor({ memo }: { memo: Memo }) {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  
  const [currentTitle, setCurrentTitle] = useState(memo.title);
  const [currentContent, setCurrentContent] = useState(memo.content);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentTitle(memo.title || "");
    setCurrentContent(memo.content || "");
  }, [memo.id]);

  const handleUpdate = async (updates: { title?: string; content?: string }) => {
    const nextTitle = updates.title ?? currentTitle;
    const nextContent = updates.content ?? currentContent;

    if (nextTitle === memo.title && nextContent === memo.content) return;

    if (updates.title !== undefined) setCurrentTitle(updates.title);
    if (updates.content !== undefined) setCurrentContent(updates.content);

    setIsSaving(true);
    try {
      await saveMemo(memo.id, nextTitle, nextContent);
    } catch (error) {
      console.error("저장 실패:", error);
      setCurrentTitle(memo.title);
      setCurrentContent(memo.content);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const hasChildren = memo.children && memo.children.length > 0;
    const message = hasChildren 
      ? "하위 메모가 포함되어 있습니다.\n삭제 시 모두 함께 삭제됩니다.\n\n정말 삭제하시겠습니까?" 
      : "이 메모를 삭제하시겠습니까?";

    if (confirm(message)) {
      await deleteMemo(memo.id);
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <EditorHeader
        title={currentTitle}
        updatedAt={memo.updatedAt}
        isSidebarOpen={isSidebarOpen}
        isSaving={isSaving}
        toggleSidebar={toggleSidebar}
        onTitleSave={(newTitle) => handleUpdate({ title: newTitle })}
        onDelete={handleDelete}
      />
      <EditorBody 
        initialContent={currentContent} 
        onSave={(newContent) => handleUpdate({ content: newContent })} 
      />
    </div>
  );
}