export interface PostType {
  id: string;
  slug: string;
  title: string;
  date: string;
  postId: string;
  uri: string;
  content: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
}
