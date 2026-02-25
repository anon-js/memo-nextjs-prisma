"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createMemo(parentId?: string) {
  const session = await auth();
  
  if (!session?.user?.id) return { error: "로그인이 필요합니다." };

  const newMemo = await prisma.memo.create({
    data: {
      userId: session.user.id,
      title: "제목 없음",
      content: "",
      parentId: parentId || null,
    },
  });

  revalidatePath("/");
  return { success: true, memoId: newMemo.id };
}

export async function getMemos() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return await prisma.memo.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });
}

export async function saveMemo(memoId: string, title: string, content: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "권한이 없습니다." };

  await prisma.memo.update({
    where: {
      id: memoId,
      userId: session.user.id,
    },
    data: {
      title,
      content,
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteMemo(memoId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "권한이 없습니다." };

  await prisma.memo.delete({
    where: { id: memoId, userId: session.user.id },
  });

  revalidatePath("/");
}