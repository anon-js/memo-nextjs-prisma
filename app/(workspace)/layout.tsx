import { getMemos } from "@/app/actions/memo";
import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";
import WorkspaceContainer from "@/components/workspace/WorkspaceContainer";
import { SidebarProvider } from "@/context/SidebarContext";
import { prisma } from "@/lib/prisma";

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  const [freshUser, memos] = await Promise.all([
    prisma.user.findUnique({ where: { id: session!.user.id } }),
    getMemos()
  ]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-white overflow-hidden relative">
        <Sidebar user={freshUser!} memos={memos} />
        <WorkspaceContainer>
          {children}
        </WorkspaceContainer>
      </div>
    </SidebarProvider>
  );
}