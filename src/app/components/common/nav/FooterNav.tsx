'use client';

import React from 'react';
import Link from 'next/link';
import { useMenu } from '@/hooks/useMenu';

const FooterNav = () => {
  const { menuItems, loading, error } = useMenu();

  return (
    <div className="py-4">
      <ul id="menu-footer" className="flex justify-center gap-8 max-w-[1130px] mx-auto">
        {loading ? (
          <li>メニューを読み込み中...</li>
        ) : error ? (
          <li>メニューの読み込みに失敗しました</li>
        ) : (
          menuItems.map((item) => (
            <li
              key={item.id}
              className="menu-item menu-item-type-taxonomy menu-item-object-category"
            >
              <Link href={item.uri} className="transition-colors">
                {item.label}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FooterNav;
