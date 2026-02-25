"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, deleteAccount } from "@/app/actions/user";
import { Save, Trash2, AlertTriangle } from "lucide-react";

export default function SettingsForm({ user }: { user: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setMessage("");
    
    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage("✅ 프로필이 업데이트되었습니다.");
      router.refresh();
    } else {
      setMessage(`❌ ${result.error}`);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 작성한 모든 메모가 삭제되며 복구할 수 없습니다.")) {
      return;
    }
    
    setIsLoading(true);
    await deleteAccount();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">프로필 수정</h2>
        
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">이메일은 변경할 수 없습니다.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 (닉네임)</label>
            <input
              name="username"
              type="text"
              defaultValue={user.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {message && <p className="text-sm font-medium text-blue-600 animate-pulse">{message}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Save size={16} />
              {isLoading ? "저장 중..." : "변경사항 저장"}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-red-50 p-6 rounded-lg border border-red-200">
        <div className="flex items-center gap-2 text-red-700 mb-2">
          <AlertTriangle size={20} />
          <h2 className="text-lg font-semibold">위험 구역</h2>
        </div>
        <p className="text-sm text-red-600 mb-4">
          계정을 삭제하면 작성한 모든 메모와 데이터가 영구적으로 삭제됩니다.
        </p>
        
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-600 rounded-md hover:bg-red-100 transition"
          >
            <Trash2 size={16} />
            계정 탈퇴하기
          </button>
        </div>
      </section>
    </div>
  );
}