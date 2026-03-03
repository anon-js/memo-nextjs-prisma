import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Editor from "@/components/Editor";
import { Memo } from "@/types";

export default async function MemoPage({ params }: { params: Promise<{ memoId: string }> }) {
  const session = await auth();

  const { memoId } = await params;

  const memo = await prisma.memo.findUnique({
    where: { 
      id: memoId,
      userId: session!.user.id 
    },
    include: {
      children: { 
        select: { id: true }
      }
    }
  });

  if (!memo) return <div className="p-12 text-gray-400">메모를 찾을 수 없습니다.</div>;

  return <Editor memo={memo as Memo} />;
}