"use client";

import { register } from "@/app/actions/auth";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const handleSubmit = (formData: FormData) => {
    setError("");
    setSuccess("");
    
    const userid = formData.get("userid") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    startTransition(() => {
      register({ userid, password, username })
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }

          if (data.success) {
            setSuccess(data.success);
            
            setTimeout(() => {
              router.push("/login"); 
            }, 1000);
          }
        })
        .catch(() => {
            setError("알 수 없는 오류가 발생했습니다.");
        });
    });
  };

  return (
    <div className="flex flex-col min-h-screen min-w-96 justify-center justify-self-center items-center">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">회원가입</h2>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <input
              name="userid"
              type="text"
              disabled={isPending}
              placeholder="아이디"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              disabled={isPending}
              placeholder="비밀번호"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
          </div>
          <div>
            <input
              name="username"
              type="text"
              disabled={isPending}
              placeholder="이름 (닉네임)"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md animate-pulse">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md">
              {success} 잠시 후 로그인 페이지로 이동합니다...
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? "가입 처리 중..." : "회원가입"}
          </button>

          <span className="block text-center mt-4 text-sm text-gray-600">
            이미 계정이 있으신가요?
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}