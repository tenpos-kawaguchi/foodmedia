import React from 'react';
import Link from 'next/link';
import type { PostType } from '@/types/PostType';
import Image from 'next/image';
import styles from '@/app/styles/common/posts/PostCard.module.css';

interface PostCardProps {
  post: PostType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { id, title, uri } = post;
  const sourceUrl = post.featuredImage?.node?.sourceUrl;
  console.log('post', post);

  // 日付を YYYY/MM/DD 形式に変換する関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <article key={id} className={`bg-white overflow-hidden ${styles.use_hover_animation}`}>
      <Link href={uri} className="hover:text-blue-600 transition-colors">
        <div className={styles.image_wrap}>
          {sourceUrl && (
            <Image
              src={sourceUrl}
              alt={title}
              width={350}
              height={230}
              className="w-full object-cover"
            />
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.content_inner}>
            <h3 className={styles.title}>
              <span>{post.title}</span>
            </h3>
            <p className={styles.date}>
              <time className="entry-date updated" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </p>{' '}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
