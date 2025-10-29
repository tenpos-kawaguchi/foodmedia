import React from 'react';
import CategoryService from '@/services/CategoryService';
import PostService from '@/services/PostService';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostList from '@/app/components/posts/PostList';
import PostDetail from '@/app/components/posts/PostDetail';
import CategoryTitle from '@/app/components/common/title/CategoryTitle';
import {
  TowColumn,
  TowColumnMain,
  TowColumnSidebar,
} from '@/app/components/layouts/column/TwoColumn';
import SideNav from '@/app/components/layouts/sideNav/SideNav';

interface CategoryParamsPageProps {
  params: Promise<{
    category: string;
    params: string[];
  }>;
}

// 動的メタタグ生成
export async function generateMetadata({ params }: CategoryParamsPageProps): Promise<Metadata> {
  const categoryService = new CategoryService();
  const { category, params: subParams } = await params;

  if (subParams.length === 0) {
    // カテゴリ一覧ページ
    const categoryData = await categoryService.getBySlug(category);
    if (!categoryData) {
      return {
        title: 'カテゴリが見つかりません - FoodMedia',
        description: '指定されたカテゴリが見つかりませんでした。',
      };
    }
    return {
      title: `${categoryData.name} - FoodMedia`,
      description: categoryData.description || `${categoryData.name}に関する記事一覧です。`,
    };
  } else if (subParams.length === 1) {
    // サブカテゴリ一覧ページまたは記事詳細ページ
    const subCategory = subParams[0];

    // まずカテゴリとして試行
    const categoryData = await categoryService.getBySlug(subCategory);
    if (categoryData) {
      return {
        title: `${categoryData.name} - FoodMedia`,
        description: categoryData.description || `${categoryData.name}に関する記事一覧です。`,
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
      title: 'ページが見つかりません - FoodMedia',
      description: '指定されたページが見つかりませんでした。',
    };
  } else if (subParams.length === 2) {
    // サブカテゴリ記事詳細ページ
    const [subCategory, slug] = subParams;
    const fullSlug = `${category}/${subCategory}`;
    const categoryData = await categoryService.getBySlug(fullSlug);
    if (!categoryData) {
      return {
        title: 'サブカテゴリが見つかりません - FoodMedia',
        description: '指定されたサブカテゴリが見つかりませんでした。',
      };
    }
    return {
      title: `${categoryData.name} - ${slug} - FoodMedia`,
      description: `${categoryData.name}の${slug}に関する記事です。`,
    };
  }
  return {
    title: 'ページが見つかりません - FoodMedia',
    description: '指定されたページが見つかりませんでした。',
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
          <h1 className="text-2xl font-bold text-red-600">カテゴリが見つかりません</h1>
        </div>
      );
    }
    return (
      <div className="mx-auto px-4 py-8">
        <CategoryTitle name={categoryData.name} />
        <TowColumn>
          <TowColumnMain>
            <div className="mx-auto bg-white">
              {categoryData.description && (
                <p className="text-gray-600 mb-4">{categoryData.description}</p>
              )}
              <PostList posts={categoryData.posts} />
            </div>
          </TowColumnMain>
          <TowColumnSidebar>
            <SideNav />
          </TowColumnSidebar>
        </TowColumn>
      </div>
    );
  } else if (subParams.length === 1) {
    // サブカテゴリ一覧ページまたは記事詳細ページ
    const subCategory = subParams[0];

    // まずカテゴリとして試行
    const categoryData = await categoryService.getBySlug(subCategory);

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
          <CategoryTitle name={categoryData.name} />
          <TowColumn>
            <TowColumnMain>
              <div className="mx-auto bg-white">
                {categoryData.description && (
                  <p className="text-gray-600 mb-4">{categoryData.description}</p>
                )}
                <PostList posts={categoryData.posts} />
              </div>
            </TowColumnMain>
            <TowColumnSidebar>
              <SideNav />
            </TowColumnSidebar>
          </TowColumn>
        </div>
      );
    } else {
      // カテゴリが見つからない場合 - 記事詳細ページとして試行
      const post = await postService.getBySlug(subCategory);

      if (!post) {
        return (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-red-600">ページが見つかりません</h1>
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

          <TowColumn>
            <TowColumnMain>
              <PostDetail post={post} />
            </TowColumnMain>
            <TowColumnSidebar>
              <SideNav />
            </TowColumnSidebar>
          </TowColumn>
        </div>
      );
    }
  } else if (subParams.length === 2) {
    // サブカテゴリ記事詳細ページまたはカテゴリページ
    const [subCategory, slug] = subParams;

    // まず最後のパラメータ（slug）をカテゴリとして試行
    const categoryData = await categoryService.getBySlug(slug);

    if (categoryData) {
      // カテゴリが見つかった場合 - サブカテゴリ一覧ページとして表示
      return (
        <div className="container mx-auto px-4 py-8">
          <nav className="text-sm text-gray-500 mb-2">
            <a href={`/${category}`} className="hover:text-blue-600">
              {category}
            </a>
            <span className="mx-2">/</span>
            <a href={`/${category}/${subCategory}`} className="hover:text-blue-600">
              {subCategory}
            </a>
            <span className="mx-2">/</span>
            <span>{slug}</span>
          </nav>
          <CategoryTitle name={categoryData.name} />
          <TowColumn>
            <TowColumnMain>
              <div className="mx-auto bg-white">
                {categoryData.description && (
                  <p className="text-gray-600 mb-4">{categoryData.description}</p>
                )}
                <PostList posts={categoryData.posts} />
              </div>
            </TowColumnMain>
            <TowColumnSidebar>
              <SideNav />
            </TowColumnSidebar>
          </TowColumn>
        </div>
      );
    } else {
      // カテゴリが見つからない場合 - 記事詳細ページとして試行
      const post = await postService.getBySlug(slug);

      if (!post) {
        return (
          <div className="container mx-auto px-4 py-8">
            <nav className="text-sm text-gray-500 mb-2">
              <a href={`/${category}`} className="hover:text-blue-600">
                {category}
              </a>
              <span className="mx-2">/</span>
              <a href={`/${category}/${subCategory}`} className="hover:text-blue-600">
                {subCategory}
              </a>
              <span className="mx-2">/</span>
              <span>{slug}</span>
            </nav>
            <h1 className="text-2xl font-bold text-red-600">ページが見つかりません</h1>
            <p className="text-gray-600 mt-2">
              指定されたページ「{category}/{subCategory}/{slug}」が見つかりませんでした。
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
            <a href={`/${category}/${subCategory}`} className="hover:text-blue-600">
              {subCategory}
            </a>
            <span className="mx-2">/</span>
            <span>{slug}</span>
          </nav>

          <TowColumn>
            <TowColumnMain>
              <PostDetail post={post} />
            </TowColumnMain>
            <TowColumnSidebar>
              <SideNav />
            </TowColumnSidebar>
          </TowColumn>
        </div>
      );
    }
  } else {
    notFound();
  }
};

export default CategoryParamsPage;
