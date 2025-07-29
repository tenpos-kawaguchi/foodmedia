import React from "react";
import PostList from "../components/posts/PostList";

export const metadata = {
  title: "投稿一覧",
  description: "最新の投稿一覧ページです",
};

const PostsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">投稿一覧</h1>
      <PostList />
    </div>
  );
};

export default PostsPage;
