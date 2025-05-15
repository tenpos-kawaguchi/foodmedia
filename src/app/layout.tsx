import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layouts/header";
import Footer from "@/app/components/layouts/footer";
import { CommonBanner } from "@/app/components/common/banner";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "foodmedia-next-sample",
  description: "foodmediaのnetex.jsのサンプルアプリケーションです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="mx-auto">
        <div className="flex flex-col min-h-screen">
          <Header></Header>
          <main className="flex-grow">{children}</main>
          <CommonBanner />
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
