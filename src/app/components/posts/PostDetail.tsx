import Image from 'next/image';
import { PostType } from '@/types/PostType';
import PostTitle from './PostTitle';
import styles from '@/app/styles/common/posts/PostDetail.module.css';

interface PostDetailProps {
  post: PostType;
}

export default function PostDetail({ post }: PostDetailProps) {
  return (
    <div className={styles.postDetail}>
      <article className={styles.article}>
        <PostTitle post={post} />

        {post.categories?.nodes && post.categories.nodes.length > 0 && (
          <div className={styles.categories}>
            {post.categories.nodes.map((cat) => (
              <span key={cat.slug} className={styles.category}>
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {post.featuredImage?.node?.sourceUrl && (
          <div className={styles.featuredImage}>
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.title}
              width={800}
              height={400}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className={styles.contentInner} />
        </div>
      </article>
    </div>
  );
}
