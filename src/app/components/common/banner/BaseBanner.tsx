import React from "react";
import Link from "next/link";
import styles from "@/app/styles/common/banner/BaseBanner.module.css";
import type { BaseBannerProps } from "./types";

const BaseBanner: React.FC<BaseBannerProps> = ({
  title,
  description,
  imageUrl,
  linkUrl,
  backgroundColor = "#f5f5f5",
  className = "",
}) => {
  return (
    <div
      className={`${styles.banner} ${className}`}
      style={{ backgroundColor }}
    >
      <div className={styles.bannerContent}>
        <div className={styles.bannerText}>
          <h3 className={styles.bannerTitle}>{title}</h3>
          {description && (
            <p className={styles.bannerDescription}>{description}</p>
          )}
        </div>
        <div className={styles.bannerImage}>
          <img src={imageUrl} alt={title} />
        </div>
      </div>
      <Link href={linkUrl} className={styles.bannerLink}>
        詳しく見る
      </Link>
    </div>
  );
};

export default BaseBanner;
