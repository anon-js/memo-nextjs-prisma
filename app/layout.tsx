import { getMemos } from "@/app/actions/memo";
import { auth } from "@/auth";
import { Sidebar } from "@/components/Sidebar";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Memo',
  description: "간편한 웹 메모",
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  let freshUser = null;
  if (session?.user?.id) {
    freshUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
  }

  const memos = session?.user ? await getMemos() : [];
  
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} antialiased`}
      >
        <div className="flex h-screen overflow-hidden">
          {freshUser && (
            <Sidebar user={freshUser} memos={memos} />
          )}
          <div className="flex-1 flex flex-col min-w-0">
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
