"use server";

import { prisma } from "@/lib/prisma";
import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "권한이 없습니다." };

  const username = formData.get("username") as string;

  if (!username || username.trim().length < 2) {
    return { error: "이름은 2글자 이상이어야 합니다." };
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { username },
    });

    revalidatePath("/settings");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "프로필 업데이트 실패" };
  }
}

export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.id) return { error: "권한이 없습니다." };

  try {
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    await signOut({ redirectTo: "/login" });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "계정 삭제 실패" };
  }
}