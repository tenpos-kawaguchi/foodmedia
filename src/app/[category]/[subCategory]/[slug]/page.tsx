import React from "react";
import PostService from "@/services/PostService";
import type { Metadata } from "next";
import { generateArticleMetadata } from "@/lib/metadata";
import Image from "next/image";

interface BlogPostDetailPageProps {
  params: {
    category: string;
    subCategory: string;
    slug: string;
  };
}

// 動的メタタグ生成
export async function generateMetadata({
  params,
}: BlogPostDetailPageProps): Promise<Metadata> {
  const postService = new PostService();
  const post = await postService.getBySlug(params.slug);

  if (!post) {
    return {
      title: "記事が見つかりません - FoodMedia",
      description: "指定された記事が見つかりませんでした。",
    };
  }

  return generateArticleMetadata(
    post.title,
    post.excerpt || post.title,
    post.featuredImage?.node?.sourceUrl,
    post.date,
    post.modified,
    post.author?.node?.name
  );
}

const BlogPostDetailPage = async ({ params }: BlogPostDetailPageProps) => {
  const postService = new PostService();
  const post = await postService.getBySlug(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">
          記事が見つかりません
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {post.featuredImage?.node?.sourceUrl && (
            <div className="mb-6">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          <div className="flex items-center text-gray-600 text-sm mb-4">
            {post.date && (
              <time dateTime={post.date} className="mr-4">
                公開日: {new Date(post.date).toLocaleDateString("ja-JP")}
              </time>
            )}
            {post.author?.node?.name && (
              <span className="mr-4">著者: {post.author.node.name}</span>
            )}
          </div>
        </header>

        {post.excerpt && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-700">{post.excerpt}</p>
          </div>
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-2">カテゴリ:</h3>
            <div className="flex flex-wrap gap-2">
              {post.categories.nodes.map((category) => (
                <span
                  key={category.slug}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default BlogPostDetailPage;
