"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Memo, ApiResponse } from "@/types";

export async function getMemos(): Promise<Memo[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  try {
    const memos = await prisma.memo.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
    });
    
    return memos as Memo[];
  } catch (error) {
    console.error("메모 조회 에러:", error);
    return [];
  }
}

export async function createMemo(parentId: string | null = null): Promise<ApiResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "로그인이 필요합니다." };
  }

  try {
    const newMemo = await prisma.memo.create({
      data: {
        title: "",
        content: "",
        userId: session.user.id,
        parentId: parentId,
      },
    });

    revalidatePath("/");
    return { success: true, memoId: newMemo.id };
  } catch (error) {
    return { success: false, error: "메모 생성에 실패했습니다." };
  }
}

export async function saveMemo(
  id: string, 
  title: string, 
  content: string
): Promise<ApiResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "권한이 없습니다." };
  }

  try {
    await prisma.memo.update({
      where: { id, userId: session.user.id },
      data: { title, content },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "저장 중 오류가 발생했습니다." };
  }
}

export async function deleteMemo(id: string): Promise<ApiResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "권한이 없습니다." };
  }

  try {
    await prisma.memo.delete({
      where: { id, userId: session.user.id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "삭제 중 오류가 발생했습니다." };
  }
}