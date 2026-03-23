"use client";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { cn, formatDate } from "@/lib/utils";
import { ChevronLeft, Clock, Loader2, Menu, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface EditorHeaderProps {
  title: string;
  updatedAt: Date;
  isSidebarOpen: boolean;
  isSaving: boolean;
  toggleSidebar: () => void;
  onTitleSave: (title: string) => void;
  onDelete: () => void;
}

export function EditorHeader({
  title: initialTitle,
  updatedAt,
  isSidebarOpen,
  isSaving,
  toggleSidebar,
  onTitleSave,
  onDelete,
}: EditorHeaderProps) {
  const [titleText, setTitleText] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setTitleText(initialTitle || "");
    }
  }, [initialTitle, isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (titleText !== initialTitle) {
      onTitleSave(titleText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white min-h-16">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Button
          variant="ghost"
          icon={isSidebarOpen ? ChevronLeft : Menu}
          iconSize={isSidebarOpen ? 26 : 20}
          onClick={toggleSidebar}
          className={cn(isSidebarOpen ? "p-1.25" : "p-2")}
          title={isSidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            onFocus={() => setIsEditing(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="제목 없음"
            className="text-2xl font-semibold bg-transparent border-none outline-none focus:ring-0 truncate w-full p-0"
          />
          <div className="flex items-center gap-1 text-sm text-gray-400 h-5">
            {isSaving ? (
              <div className="flex items-center gap-1.5">
                <Loader2 size={12} className="animate-spin" />
                <span className="text-sm font-medium">저장 중...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span
                  className="text-sm font-normal"
                  suppressHydrationWarning
                >
                  {formatDate(updatedAt)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="danger"
          icon={Trash2}
          onClick={onDelete}
          className="p-2 hidden sm:flex"
          title="메모 삭제"
        />
        <Dropdown className="sm:hidden">
          <Dropdown.Trigger>
            <Button variant="ghost" icon={MoreVertical} className="p-2" />
          </Dropdown.Trigger>
          <Dropdown.List align="end">
            <Dropdown.Item icon={Trash2} variant="danger" onClick={onDelete}>
              메모 삭제
            </Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
    </header>
  );
}