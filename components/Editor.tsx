"use client";

import { useState, useEffect } from "react";
import { saveMemo, deleteMemo } from "@/app/actions/memo";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Editor({ memo }: { memo: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  useEffect(() => {
    setTitle(memo.title || "");
    setContent(memo.content || "");
  }, [memo.id]); 

  const handleBlur = async () => {
    await saveMemo(memo.id, title, content);
  };
  
  const handleDelete = async () => {
    const hasChildren = memo.children && memo.children.length > 0;

    let message = "이 메모를 삭제하시겠습니까?";

    if (hasChildren) {
      message = "하위 메모가 포함되어 있습니다.\n삭제 시 하위 메모도 모두 함께 삭제됩니다.\n\n정말 삭제하시겠습니까?";
    }

    if (confirm(message)) {
      await deleteMemo(memo.id);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        placeholder="제목 없음"
        className="text-4xl font-bold placeholder-gray-300 border-none outline-none w-full bg-transparent mb-4"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        placeholder="내용을 입력하세요..."
        className="w-full h-[60vh] resize-none border-none outline-none text-lg leading-relaxed bg-transparent"
      />
      
      <button onClick={handleDelete} className="text-red-400 hover:text-red-600 flex items-center gap-1 mt-4 text-sm">
        <Trash2 size={16}/> 삭제하기
      </button>
    </div>
  );
}