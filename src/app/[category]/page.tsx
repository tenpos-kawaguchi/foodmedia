import React from "react";
import CategoryService from "@/services/CategoryService";
import Image from "next/image";
import type { Metadata } from "next";
import { generateCategoryMetadata } from "@/lib/metadata";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// 動的メタタグ生成
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const categoryService = new CategoryService();
  const category = await categoryService.getBySlug(params.category);

  if (!category) {
    return {
      title: "カテゴリが見つかりません - FoodMedia",
      description: "指定されたカテゴリが見つかりませんでした。",
    };
  }

  return generateCategoryMetadata(category.name);
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categoryService = new CategoryService();
  const category = await categoryService.getBySlug(params.category);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">
          カテゴリが見つかりません
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mb-4">{category.description}</p>
        )}
        <p className="text-sm text-gray-500">記事数: {category.count}件</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {post.featuredImage?.node?.sourceUrl && (
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={300}
                height={225}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <a
                  href={post.uri}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </a>
              </h2>
            </div>
          </article>
        ))}
      </div>

      {category.posts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">このカテゴリには記事がありません。</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
