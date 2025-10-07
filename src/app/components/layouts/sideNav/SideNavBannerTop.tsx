import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const bannerData = [
  {
    href: 'https://www.youtube.com/@tenposfoodmedia/videos',
    src: 'https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2024/04/bnr_youtube.jpg',
    alt: '「テンポスフードメディア」You Tube チャンネルはこちらから',
  },
];

const SideNavBannerTop = () => {
  return (
    <div>
      {bannerData.map((banner, index) => (
        <div key={index} className="mb-[40px]">
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

export default SideNavBannerTop;
