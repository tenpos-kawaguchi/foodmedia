export interface PostType {
  id: string;
  slug: string;
  title: string;
  date: string;
  openmapId: string;
  uri: string;
  content: string;
  featuredImage: { node: { sourceUrl: string; sizes: string } };
}
