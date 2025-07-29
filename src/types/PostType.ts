export interface PostType {
  id: string;
  slug: string;
  title: string;
  date: string;
  openmapId: string;
  uri: string;
  content: string;
  excerpt?: string;
  modified?: string;
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
