import React from 'react';
import CategoryService from '@/services/CategoryService';
import type { Metadata } from 'next';
import { generateCategoryMetadata } from '@/lib/metadata';
import PostList from '@/app/components/posts/PostList';
import CategoryTitle from '@/app/components/common/title/CategoryTitle';
import {
  TowColumn,
  TowColumnMain,
  TowColumnSidebar,
} from '@/app/components/layouts/column/TwoColumn';
import SideNav from '../components/layouts/sideNav/SideNav';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

// 動的メタタグ生成
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryService = new CategoryService();
  const { category } = await params;
  const categoryData = await categoryService.getBySlug(category);

  if (!categoryData) {
    return {
      title: 'カテゴリが見つかりません - FoodMedia',
      description: '指定されたカテゴリが見つかりませんでした。',
    };
  }

  return generateCategoryMetadata(categoryData.name);
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categoryService = new CategoryService();
  const { category } = await params;
  const categoryData = await categoryService.getBySlug(category);

  if (!categoryData) {
    return (
      <div className="mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">カテゴリが見つかりません</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-8">
      <CategoryTitle name={categoryData.name} />
      {/* <p className="text-sm text-gray-500">記事数: {categoryData.count}件</p> */}
      <TowColumn>
        <TowColumnMain>
          <div className="mx-auto bg-white">
            <PostList posts={categoryData.posts} />
          </div>
        </TowColumnMain>
        <TowColumnSidebar>
          <SideNav />
        </TowColumnSidebar>
      </TowColumn>
    </div>
  );
};

export default CategoryPage;
