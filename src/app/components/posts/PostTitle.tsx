import { PostType } from '@/types/PostType';
import styles from '@/app/styles/common/posts/PostDetail.module.css';

interface PostTitleProps {
  post: PostType;
}

// 日付フォーマット関数
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export default function PostTitle({ post }: PostTitleProps) {
  return (
    <div id="post_title" className={styles.postTitle}>
      <ul className={`${styles.metaTop} clearfix`}>
        <li className={styles.date}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </li>
        {post.modified && post.modified !== post.date && (
          <li className={styles.update}>
            <time dateTime={post.modified}>{formatDate(post.modified)}</time>
          </li>
        )}
      </ul>
      <h1 className={styles.title}>{post.title}</h1>
    </div>
  );
}
