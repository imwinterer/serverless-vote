import type { Metadata } from "next";
import { Noto_Sans_JP } from 'next/font/google'
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  weight: '500',
  preload: false,
  display: 'swap'
})

export const metadata: Metadata = {
  title: "Serverless Vote",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
