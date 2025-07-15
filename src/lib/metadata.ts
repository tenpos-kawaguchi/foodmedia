import type { Metadata } from "next";

export interface GenerateMetadataParams {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: GenerateMetadataParams): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_FOODMEDIA_URL || "https://foodmedia.com";
  const defaultImage = `${baseUrl}/og-image.jpg`;

  const metadata: Metadata = {
    title: `${title} - FoodMedia`,
    description,
    keywords,
    openGraph: {
      title: `${title} - FoodMedia`,
      description,
      type,
      locale: "ja_JP",
      siteName: "FoodMedia",
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - FoodMedia`,
      description,
      images: [image || defaultImage],
    },
  };

  // 記事タイプの場合、追加のメタタグを設定
  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
    };
  }

  return metadata;
}

// カテゴリーページ用のメタタグ生成
export function generateCategoryMetadata(categoryName: string): Metadata {
  return generateMetadata({
    title: `${categoryName}の記事`,
    description: `${categoryName}に関する記事一覧です。最新の情報をお届けします。`,
    keywords: `${categoryName},料理,レシピ,FoodMedia`,
  });
}

// 記事詳細ページ用のメタタグ生成
export function generateArticleMetadata(
  title: string,
  description: string,
  image?: string,
  publishedTime?: string,
  modifiedTime?: string,
  author?: string
): Metadata {
  return generateMetadata({
    title,
    description,
    image,
    type: "article",
    publishedTime,
    modifiedTime,
    author,
  });
}
