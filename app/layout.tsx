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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} antialiased`}
      >
        <main className="flex flex-col flex-1">{children}</main>
        <footer className="w-full text-center text-sm text-gray-500 p-4">
          &copy; 2026. anon. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
