import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/layouts/sideNav/sideNavBanner.module.css';

const bannerData = [
  {
    href: 'https://www.tenpos.com/?utm_source=referral&utm_medium=foodmedia',
    src: 'https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2021/06/bnr_tdc_01.jpg',
    alt: 'TENPOS',
  },
  {
    href: 'https://support.tenpos.com/',
    src: 'https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2025/03/bnr_tfp_01-1_2.jpg',
    alt: 'TENPOS Support',
  },
  {
    href: 'https://liff.line.me/1654276915-81EQqQvj/landing?follow=%40393qkbvw&lp=jFyKhF&liff_id=1654276915-81EQqQvj',
    src: 'https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2022/10/bnr_line.jpg',
    alt: 'LINE',
  },
  {
    href: 'https://tenposfoodplace.jp/lp/service/op-celebration/',
    src: 'https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2024/01/bnr_op-celebration_640_260.jpg',
    alt: 'OP Celebration',
  },
];

const SideNavBannerBottom = () => {
  return (
    <div>
      {bannerData.map((banner, index) => (
        <div key={index} className={`${styles.widgetContent} clearfix ${styles.tcdAdWidget}`}>
          <Link href={banner.href} target="_blank">
            <Image
              src={banner.src}
              alt={banner.alt}
              width={300}
              height={200}
              style={{ width: '100%', height: 'auto' }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SideNavBannerBottom;
