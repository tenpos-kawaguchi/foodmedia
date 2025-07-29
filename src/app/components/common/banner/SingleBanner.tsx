import React from "react";
import BaseBanner from "./BaseBanner";
import styles from "@/app/styles/common/banner/SingleBanner.module.css";
import type { BaseBannerProps } from "./types";

const SingleBanner: React.FC<BaseBannerProps> = (props) => {
  return (
    <div className={styles.singleBannerContainer}>
      <BaseBanner {...props} className={styles.singleBanner} />
    </div>
  );
};

export default SingleBanner;
