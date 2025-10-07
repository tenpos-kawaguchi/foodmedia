'use client';

import React from 'react';
import type { PostType } from '@/types/PostType';
import PostCard from './PostCard';

interface PostListProps {
  posts: PostType[];
  isLoading?: boolean;
  error?: string | null;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading = false, error = null }) => {
  if (error) {
    return <div className="text-red-500 p-4">エラーが発生しました: {error}</div>;
  }

  if (isLoading) {
    return <p>データを読み込み中...</p>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">このカテゴリには記事がありません。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 use_hover_animation">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
