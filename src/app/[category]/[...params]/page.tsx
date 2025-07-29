import React from "react";
import CategoryService from "@/services/CategoryService";
import PostService from "@/services/PostService";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CategoryParamsPageProps {
  params: Promise<{
    category: string;
    params: string[];
  }>;
}

// 動的メタタグ生成
export async function generateMetadata({
  params,
}: CategoryParamsPageProps): Promise<Metadata> {
  const categoryService = new CategoryService();
  const { category, params: subParams } = await params;
  console.log(category, subParams);

  if (subParams.length === 0) {
    // カテゴリ一覧ページ
    const categoryData = await categoryService.getBySlug(category);
    if (!categoryData) {
      return {
        title: "カテゴリが見つかりません - FoodMedia",
        description: "指定されたカテゴリが見つかりませんでした。",
      };
    }
    return {
      title: `${categoryData.name} - FoodMedia`,
      description:
        categoryData.description ||
        `${categoryData.name}に関する記事一覧です。`,
    };
  } else if (subParams.length === 1) {
    // サブカテゴリ一覧ページまたは記事詳細ページ
    const subCategory = subParams[0];

    // まずカテゴリとして試行
    const categoryData = await categoryService.getBySlug(subCategory);
    if (categoryData) {
      return {
        title: `${categoryData.name} - FoodMedia`,
        description:
          categoryData.description ||
          `${categoryData.name}に関する記事一覧です。`,
      };
    }

    // カテゴリが見つからない場合 - 記事詳細ページとして試行
    const postService = new PostService();
    const post = await postService.getBySlug(subCategory);
    if (post) {
      return {
        title: `${post.title} - FoodMedia`,
        description: post.excerpt || `${post.title}の記事です。`,
      };
    }

    return {
      title: "ページが見つかりません - FoodMedia",
      description: "指定されたページが見つかりませんでした。",
    };
  } else if (subParams.length === 2) {
    // サブカテゴリ記事詳細ページ
    const [subCategory, slug] = subParams;
    const fullSlug = `${category}/${subCategory}`;
    const categoryData = await categoryService.getBySlug(fullSlug);
    if (!categoryData) {
      return {
        title: "サブカテゴリが見つかりません - FoodMedia",
        description: "指定されたサブカテゴリが見つかりませんでした。",
      };
    }
    return {
      title: `${categoryData.name} - ${slug} - FoodMedia`,
      description: `${categoryData.name}の${slug}に関する記事です。`,
    };
  }
  return {
    title: "ページが見つかりません - FoodMedia",
    description: "指定されたページが見つかりませんでした。",
  };
}

const CategoryParamsPage = async ({ params }: CategoryParamsPageProps) => {
  const categoryService = new CategoryService();
  const postService = new PostService();
  const { category, params: subParams } = await params;

  if (subParams.length === 0) {
    // カテゴリ一覧ページ
    const categoryData = await categoryService.getBySlug(category);
    if (!categoryData) {
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
        <h1 className="text-3xl font-bold mb-4">{categoryData.name}</h1>
        {categoryData.description && (
          <p className="text-gray-600 mb-4">{categoryData.description}</p>
        )}
        <p className="text-sm text-gray-500">記事数: {categoryData.count}件</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.posts.map((post) => (
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
                {post.excerpt && (
                  <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                )}
                <p className="text-xs text-gray-500">{post.date}</p>
              </div>
            </article>
          ))}
        </div>
        {categoryData.posts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">このカテゴリには記事がありません。</p>
          </div>
        )}
      </div>
    );
  } else if (subParams.length === 1) {
    // サブカテゴリ一覧ページまたは記事詳細ページ
    const subCategory = subParams[0];

    // まずカテゴリとして試行
    const categoryData = await categoryService.getBySlug(subCategory);
    console.log("categoryData", categoryData);

    if (categoryData) {
      // カテゴリが見つかった場合 - サブカテゴリ一覧ページとして表示
      return (
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-2">
            <a href={`/${category}`} className="hover:text-blue-600">
              {category}
            </a>
            <span className="mx-2">/</span>
            <span>{subCategory}</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">{categoryData.name}</h1>
          {categoryData.description && (
            <p className="text-gray-600 mb-4">{categoryData.description}</p>
          )}
          <p className="text-sm text-gray-500">
            記事数: {categoryData.count}件
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.posts.map((post) => (
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
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
                  )}
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </article>
            ))}
          </div>
          {categoryData.posts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                このサブカテゴリには記事がありません。
              </p>
            </div>
          )}
        </div>
      );
    } else {
      // カテゴリが見つからない場合 - 記事詳細ページとして試行
      const post = await postService.getBySlug(subCategory);

      if (!post) {
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-red-600">
              ページが見つかりません
            </h1>
            <p className="text-gray-600 mt-2">
              指定されたページ「{category}/{subCategory}
              」が見つかりませんでした。
            </p>
          </div>
        );
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-2">
            <a href={`/${category}`} className="hover:text-blue-600">
              {category}
            </a>
            <span className="mx-2">/</span>
            <span>{subCategory}</span>
          </nav>

          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                {post.author?.node?.name && (
                  <span className="mr-4">著者: {post.author.node.name}</span>
                )}
                <span>公開日: {post.date}</span>
                {post.modified && post.modified !== post.date && (
                  <span className="ml-4">更新日: {post.modified}</span>
                )}
              </div>
              {post.categories?.nodes && post.categories.nodes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.nodes.map((cat) => (
                    <span
                      key={cat.slug}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {post.featuredImage?.node?.sourceUrl && (
              <div className="mb-8">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-800 leading-relaxed"
              />
            </div>
          </article>
        </div>
      );
    }
  } else if (subParams.length === 2) {
    // サブカテゴリ記事詳細ページ
    const [subCategory, slug] = subParams;
    // const fullSlug = `${category}/${subCategory}`;
    const categoryData = await categoryService.getBySlug(subCategory);

    if (!categoryData) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-600">
            サブカテゴリが見つかりません
          </h1>
          <p className="text-gray-600 mt-2">
            指定されたサブカテゴリ「{category}/{subCategory}
            」が見つかりませんでした。
          </p>
        </div>
      );
    }

    // 投稿データを取得
    const post = await postService.getBySlug(slug);

    if (!post) {
      return (
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-2">
            <a href={`/${category}`} className="hover:text-blue-600">
              {category}
            </a>
            <span className="mx-2">/</span>
            <a
              href={`/${category}/${subCategory}`}
              className="hover:text-blue-600"
            >
              {subCategory}
            </a>
            <span className="mx-2">/</span>
            <span>{slug}</span>
          </nav>
          <h1 className="text-2xl font-bold text-red-600">
            記事が見つかりません
          </h1>
          <p className="text-gray-600 mt-2">
            指定された記事「{slug}」が見つかりませんでした。
          </p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-2">
          <a href={`/${category}`} className="hover:text-blue-600">
            {category}
          </a>
          <span className="mx-2">/</span>
          <a
            href={`/${category}/${subCategory}`}
            className="hover:text-blue-600"
          >
            {subCategory}
          </a>
          <span className="mx-2">/</span>
          <span>{slug}</span>
        </nav>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              {post.author?.node?.name && (
                <span className="mr-4">著者: {post.author.node.name}</span>
              )}
              <span>公開日: {post.date}</span>
              {post.modified && post.modified !== post.date && (
                <span className="ml-4">更新日: {post.modified}</span>
              )}
            </div>
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.nodes.map((cat) => (
                  <span
                    key={cat.slug}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.featuredImage?.node?.sourceUrl && (
            <div className="mb-8">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-800 leading-relaxed"
            />
          </div>
        </article>
      </div>
    );
  } else {
    notFound();
  }
};

export default CategoryParamsPage;
