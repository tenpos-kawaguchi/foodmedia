import React from 'react';
import PostService from '@/services/PostService';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

const Url = process.env.NEXT_PUBLIC_FOODMEDIA_URL;

export const metadata: Metadata = {
  title: 'FoodMedia - 食に関する情報を共有するプラットフォーム',
  description:
    '最新の料理レシピ、食材情報、飲食店レビューなど、食に関する様々な情報を共有するプラットフォームです。',
  keywords: '料理,レシピ,食材,飲食店,グルメ,フード',
  openGraph: {
    title: 'FoodMedia - 食に関する情報を共有するプラットフォーム',
    description:
      '最新の料理レシピ、食材情報、飲食店レビューなど、食に関する様々な情報を共有するプラットフォームです。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodMedia - 食に関する情報を共有するプラットフォーム',
    description:
      '最新の料理レシピ、食材情報、飲食店レビューなど、食に関する様々な情報を共有するプラットフォームです。',
  },
};

const Home = async () => {
  const postService = new PostService();
  const posts = await postService.getList();
  const recentPosts = posts.slice(0, 10); // 最初の10件のみ取得

  return (
    <div className="gap-4 mx-4">
      <h2>最新記事10件</h2>
      {recentPosts.length > 0 ? (
        recentPosts.map(({ id, slug, title, postId, uri, featuredImage }) => (
          <div key={postId} className="bg-gray-100 p-4 rounded shadow">
            <Link href={`${Url}${uri}`} className="text-blue-500 hover:underline">
              <h2 className="text-xl font-bold">{title}</h2>
              <p>
                {slug}
                {id}
                {postId}
                {uri}
                {featuredImage?.node.sourceUrl && (
                  <Image
                    src={featuredImage.node.sourceUrl}
                    alt={title}
                    width={500}
                    height={300}
                    className="rounded"
                  />
                )}
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p>記事が見つかりませんでした。</p>
      )}
    </div>
  );
};

export default Home;
