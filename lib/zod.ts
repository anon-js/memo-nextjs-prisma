import { z } from "zod";

export const LoginSchema = z.object({
  userid: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

export const RegisterSchema = z.object({
  userid: z.string().min(4, "아이디는 4자 이상이어야 합니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  username: z.string().min(1, "이름을 입력해주세요."),
});