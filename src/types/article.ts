export type Article = {
  id: string;
  title: string;
  content: string;
  preview_content: string;
  created_at: string;
  updated_at: string;
  author_id: string;
};

export type ArticlePreview = Pick<
  Article,
  "id" | "title" | "preview_content" | "created_at"
>;
