"use client";

import { register } from "@/app/actions/auth";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    username: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMsg = "";

    if (name === "userid" && value.length > 0 && value.length < 4) {
      errorMsg = "아이디는 4자 이상이어야 합니다.";
    }
    
    if (name === "password" && value.length > 0 && value.length < 6) {
      errorMsg = "비밀번호는 6자 이상이어야 합니다.";
    }

    if (name === "confirmPassword" && value && value !== formData.password) {
      errorMsg = "비밀번호가 일치하지 않습니다.";
    }

    if (errorMsg) {
      setValidationErrors(prev => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    startTransition(() => {
      register({ 
        userid: formData.userid, 
        password: formData.password, 
        username: formData.username 
      })
        .then((data) => {
          if (data.error) {
            setError(data.error);
            return;
          }
          if (data.success) {
            setSuccess(data.success);
            setTimeout(() => router.push("/login"), 1000);
          }
        })
        .catch(() => setError("알 수 없는 오류가 발생했습니다."));
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          회원가입을 통해<br />
          간단하게 메모를 관리해 보세요!
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="아이디"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            onBlur={handleBlur}
            error={validationErrors.userid}
            disabled={isPending}
            placeholder="아이디를 입력해 주세요."
            required
          />

          <Input
            label="비밀번호"
            name="password"
            isPassword
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={validationErrors.password}
            disabled={isPending}
            placeholder="비밀번호를 입력해 주세요."
            required
          />

          <Input
            label="비밀번호 확인"
            name="confirmPassword"
            isPassword
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={validationErrors.confirmPassword}
            disabled={isPending}
            placeholder="비밀번호를 한 번 더 입력해 주세요."
            required
          />

          <Input
            label="닉네임"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={isPending}
            placeholder="닉네임을 입력해 주세요."
            required
          />

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md">
              {success} 잠시 후 로그인 페이지로 이동합니다...
            </div>
          )}

          <hr className="border-gray-200 my-2" />

          <Button type="submit" isLoading={isPending}>
            회원가입
          </Button>

          <p className="text-center mt-4 text-sm text-gray-600">
            이미 계정이 있으신가요?
            <Link href="/login" className="ml-2 hover:underline text-blue-600">
              로그인
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}