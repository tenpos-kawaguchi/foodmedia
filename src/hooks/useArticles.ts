import { useState, useEffect } from "react";
import { supabase } from "@/services/supabase";
import type { Article, ArticlePreview } from "@/types/article";

export const useArticles = () => {
  const [articles, setArticles] = useState<ArticlePreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, preview_content, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "記事の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    articles,
    loading,
    error,
  };
};

export const useArticle = (articleId: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleId) {
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", articleId)
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "記事の取得に失敗しました"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  return {
    article,
    loading,
    error,
  };
};
