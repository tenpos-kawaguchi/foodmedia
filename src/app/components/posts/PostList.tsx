"use client";

import React, { useEffect, useState } from "react";
import PostService from "@/services/PostService";
import type { PostType } from "@/types/PostType";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const postService = new PostService();
        const data = await postService.getList();
        if (!data || !Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError(
          error instanceof Error ? error.message : "データの取得に失敗しました"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 p-4">エラーが発生しました: {error}</div>
    );
  }

  return (
    <div className="space-y-4">
      {isLoading ? (
        <p>データを読み込み中...</p>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.openmapId} post={post} />
          ))}
        </div>
      ) : (
        <p>記事が見つかりませんでした</p>
      )}
    </div>
  );
};

export default PostList;
