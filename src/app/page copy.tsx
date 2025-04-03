import PostService from "../services/PostService";
import type PostType from "../types/PostType";
import React from "react";

const Home = async () => {
  const staticPostList: PostType[] = await PostService.getList();
  console.log("staticPostList:", staticPostList);
  return (
    <div className="flex gap-4 mx-4">
      aaa
      {staticPostList.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default Home;
