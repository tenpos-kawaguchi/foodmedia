import React from "react";
import Link from "next/link";
import styles from "@/app/styles/common/banner/CommonBanner.module.css";
import type { BannerItem } from "./types";
import { BANNER_DATA } from "./bannerData";
import Image from "next/image";

export interface CommonBannerProps {
  banners?: BannerItem[];
}

const CommonBanner = ({ banners = BANNER_DATA }: CommonBannerProps) => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerGrid}>
        {banners.map((banner, index) => (
          <div key={index}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerImage}>
                <Link
                  href={banner.linkUrl}
                  className={styles.bannerLink}
                  target="_blank"
                >
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    width={340}
                    height={140}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonBanner;
