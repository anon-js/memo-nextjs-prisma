"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile, deleteAccount } from "@/app/actions/user";
import { ChevronLeft, Loader2, Menu, Trash2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export default function ProfileSettingForm({ user }: { user: any }) {
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isNicknamePending, setIsNicknamePending] = useState(false);
  const [isDeleteAccountPending, setIsDeleteAccountPending] = useState(false);

  const onBlurSaveEditProfile = async (formData: FormData) => {
    setIsNicknamePending(true);

    const result = await updateProfile(formData);
    
    if (result.success) router.refresh();

    setIsNicknamePending(false);
  };

  const handleEnterBlur = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("정말 탈퇴하시겠습니까? 작성한 모든 메모가 삭제되며 복구할 수 없습니다.")) {
      return;
    }
    
    setIsDeleteAccountPending(true);
    await deleteAccount();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section>
        <div className="flex items-center mb-2 gap-2 min-h-10">
          <Button
            variant="ghost"
            icon={isSidebarOpen ? ChevronLeft : Menu}
            iconSize={isSidebarOpen ? 26 : 20}
            onClick={toggleSidebar}
            className={cn(isSidebarOpen ? "p-1.25" : "p-2", "transition-none")}
            title={isSidebarOpen ? "사이드바 접기" : "사이드바 펼치기"}
          />
          <h1 className="text-xl font-bold">프로필 수정</h1></div>
        <hr className="border-gray-200" />
        <div className="px-2 py-4">
          <p className="text-sm font-medium text-gray-700">닉네임</p>
          <div className="relative">
            <Input
              name="username"
              placeholder="닉네임을 입력해 주세요."
              defaultValue={user.username}
              onBlur={(e) => {
                if (e.target.value === user.username) return;
                
                const formData = new FormData();
                formData.append("username", e.target.value);
                onBlurSaveEditProfile(formData);
              }}
              onKeyDown={handleEnterBlur}
              disabled={isNicknamePending}
              required
            />
            <Loader2 className={`absolute right-3 top-1/2 -translate-y-1/2 animate-spin ${isNicknamePending ? "visible" : "hidden"}`} size={16} />
          </div>
        </div>
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
            onClick={handleDeleteAccount}
            disabled={isDeleteAccountPending}
          >
            계정 탈퇴하기
          </Button>
        </div>
      </section>
    </div>
  );
}