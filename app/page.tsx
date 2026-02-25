import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex items-center justify-center h-full text-gray-400">
      <p>작성할 메모를 선택하거나 새로 만드세요.</p>
    </div>
  );
}