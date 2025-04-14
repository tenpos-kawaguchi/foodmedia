import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/header";
import Footer from "@/app/footer";

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
      <body className="container mx-auto p-4">
        <div className="flex flex-col min-h-screen">
          <Header></Header>
          <main className="flex-grow">{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
