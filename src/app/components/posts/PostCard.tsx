import React from "react";
import Link from "next/link";
import type { PostType } from "@/types/PostType";

interface PostCardProps {
  post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { title, slug, uri, openmapId } = post;
  const Url = process.env.NEXT_PUBLIC_FOODMEDIA_URL;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`${Url}${uri}`} className="block p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-300">
          {title}
        </h2>
        <div className="text-sm text-gray-600">
          <p>スラッグ: {slug}</p>
          <p>ID: {openmapId}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
