import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/header';
import Footer from '@/app/footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FoodMedia - 食に関する情報を共有するプラットフォーム',
    template: '%s - FoodMedia',
  },
  description:
    '最新の料理レシピ、食材情報、飲食店レビューなど、食に関する様々な情報を共有するプラットフォームです。',
  keywords: '料理,レシピ,食材,飲食店,グルメ,フード,料理ブログ,レシピサイト',
  authors: [{ name: 'FoodMedia Team' }],
  creator: 'FoodMedia',
  publisher: 'FoodMedia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_FOODMEDIA_URL || 'https://foodmedia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: 'FoodMedia',
    title: 'FoodMedia - 食に関する情報を共有するプラットフォーム',
    description:
      '最新の料理レシピ、食材情報、飲食店レビューなど、食に関する様々な情報を共有するプラットフォームです。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FoodMedia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@foodmedia',
    creator: '@foodmedia',
    title: 'FoodMedia - 食に関する情報を共有するプラットフォーム',
    description:
      '最新の料理レシピ、食材情報、飲食店レビューなど、食に関する様々な情報を共有するプラットフォームです。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header></Header>
          <main className="flex-grow">{children}</main>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
