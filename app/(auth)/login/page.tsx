"use client";

import { login } from "@/app/actions/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ userid: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const data = await login(formData);
      if (data?.error) setError(data.error);
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          간단하고 편리한 메모를<br />사용하기 전에 로그인해 주세요
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="아이디"
            name="userid"
            placeholder="아이디를 입력해 주세요."
            value={formData.userid}
            onChange={(e) => setFormData({ ...formData, userid: e.target.value })}
            disabled={isPending}
            required
          />
          <Input
            label="비밀번호"
            name="password"
            isPassword
            placeholder="비밀번호를 입력해 주세요."
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={isPending}
            required
          />
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">{error}</div>}
          <Button type="submit" isLoading={isPending}>로그인</Button>
        </form>
        <p className="text-center mt-6 text-sm text-gray-600">
          메모가 처음이신가요? <Link href="/signup" className="text-blue-600 hover:underline">회원가입</Link>
        </p>
      </div>
    </div>
  );
}