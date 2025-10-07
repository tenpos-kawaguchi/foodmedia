export interface PostType {
  id: string;
  postId?: string;
  openmapId?: string;
  slug: string;
  title: string;
  date: string;
  uri: string;
  sourceUrl: string;
  content: string;
  excerpt?: string;
  modified?: string;
  views?: number;
  permalink?: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  author?: {
    node: {
      name: string;
    };
  };
  categories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
}
