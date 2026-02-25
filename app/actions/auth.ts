"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema, RegisterSchema } from "@/lib/zod";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    console.log("에러 원인:", validatedFields.error.flatten());
    return { error: "입력값이 올바르지 않습니다." };
  }

  const { userid, password, username } = validatedFields.data;
  
  const existingUser = await prisma.user.findUnique({
    where: { userid },
  });
  if (existingUser) return { error: "이미 사용 중인 아이디입니다." };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      userid,
      password: hashedPassword,
      username,
      image: "",
    },
  });

  return { success: "회원가입 완료!", redirect: "/login" };
};

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "입력값이 올바르지 않습니다." };
  }

  const { userid, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      userid,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "아이디 또는 비밀번호가 일치하지 않습니다." };
        default:
          return { error: `알 수 없는 오류가 발생했습니다.${"\n"}${error.message}` };
      }
    }
    throw error;
  }
};

export async function logout() {
  await signOut({ redirectTo: "/login" });
};