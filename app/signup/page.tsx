"use client";

import { register } from "@/app/actions/auth";
import { useState, useTransition } from "react";

export default function SignupPage() {
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
      register({ userid, password, username }).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="flex flex-col min-h-screen min-w-96 justify-center justify-self-center">
      <h2 className="w-full text-2xl font-bold mb-6 text-gray-800">회원가입</h2>
      <form action={handleSubmit} className="space-y-4">
        <input
          name="userid"
          type="text"
          disabled={isPending}
          placeholder="아이디를 입력해 주세요."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="password"
          type="password"
          disabled={isPending}
          placeholder="비밀번호를 입력해 주세요."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="username"
          type="text"
          disabled={isPending}
          placeholder="이름을 입력해 주세요."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {error && <div className="p-3 bg-red-100 text-red-500 text-sm rounded-md">{error}</div>}
        {success && <div className="p-3 bg-green-100 text-green-500 text-sm rounded-md">{success}</div>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400"
        >
          {isPending ? "가입 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}