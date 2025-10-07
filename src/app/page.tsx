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

  const popularPosts = await postService.getPopularPosts(10); // 人気記事10件を取得

  return (
    <div className="gap-4 mx-4">
      {/* 人気記事ランキング */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">人気記事ランキング</h2>
        {popularPosts.length > 0 ? (
          <div className="grid gap-4">
            {popularPosts.map((post, index) => (
              <div key={post.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                  <div className="flex-1">
                    <Link
                      href={post.permalink || post.uri}
                      className="text-blue-500 hover:underline"
                    >
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-600">閲覧数: {post.views || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>人気記事が見つかりませんでした。</p>
        )}
      </section>

      {/* 最新記事 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">最新記事</h2>
        {recentPosts.length > 0 ? (
          recentPosts.map(({ id, slug, title, postId, uri, featuredImage }) => (
            <div key={postId} className="bg-gray-100 p-4 rounded shadow mb-4">
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
      </section>
    </div>
  );
};

export default Home;
