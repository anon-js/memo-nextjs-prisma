"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, deleteAccount } from "@/app/actions/user";
import { Save, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";

export default function ProfileSettingForm({ user }: { user: any }) {
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
      <section>
        <h1 className="text-xl font-bold mb-2 ps-2">프로필 수정</h1>
        <hr className="border-gray-200" />
        <form action={handleSubmit} className="flex flex-col gap-2 space-y-4 px-2 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">닉네임</label>
            <input
              name="username"
              type="text"
              defaultValue={user.username}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </form>
      </section>
      <section className="mt-16">
        <h1 className="text-xl font-bold mb-2 ps-2">위험 구역</h1>
        <div className="flex items-center justify-between gap-2 p-6 rounded-lg border border-red-200">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">계정 탈퇴하기</h3>
            <p className="text-sm text-gray-700">
              계정을 삭제하면 작성한 모든 메모와 데이터가 영구적으로 삭제됩니다.
            </p>
          </div>
          <Button
            variant="danger"
            icon={Trash2}
            onClick={handleDelete}
            disabled={isLoading}
          >
            계정 탈퇴하기
          </Button>
        </div>
      </section>
    </div>
  );
}