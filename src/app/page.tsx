"use client"; // Next.jsのClient Componentとして指定

import React, { useEffect, useState } from "react";
import PostService from "@/services/PostService";
import type { PostType } from "@/types/PostType";
import Link from "next/link";
import Image from "next/image";

console.log("DB URL:", process.env.NEXT_PUBLIC_WP_ENDPOINT); // ✅ こうすればOK
const Url = process.env.NEXT_PUBLIC_FOODMEDIA_URL;

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postService = new PostService();
        const data = await postService.getList();
        console.log("Fetched posts:", data); // デバッグ用
        setPosts(data.slice(0, 10)); // 最初の10件のみ取得
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="gap-4 mx-4">
      <h2>最新記事10件</h2>
      {posts.length > 0 ? (
        posts.map(({ id, slug, title, postId, uri, featuredImage }) => (
          <div key={postId} className="bg-gray-100 p-4 rounded shadow">
            <Link
              href={`${Url}${uri}`}
              className="text-blue-500 hover:underline"
            >
              <h2 className="text-xl font-bold">{title}</h2>
              <p>
                {slug}
                {id}
                {postId}
                {uri}
                <Image
                  src={featuredImage?.node.sourceUrl}
                  alt={title}
                  width={500}
                  height={300}
                  className="rounded"
                />
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
