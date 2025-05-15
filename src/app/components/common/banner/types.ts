export interface BannerItem {
  title: string;
  imageUrl: string;
  linkUrl: string;
}

export interface BaseBannerProps {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl: string;
  backgroundColor?: string;
  className?: string;
}
