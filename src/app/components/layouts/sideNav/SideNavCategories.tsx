'use client';

import React from 'react';
import Link from 'next/link';
import { useMenu } from '@/hooks/useMenu';
import styles from '@/app/styles/layouts/sideNav/sideNav.module.css';

const SideNavCategories = () => {
  const { menuItems, loading, error } = useMenu();

  if (loading) {
    return (
      <div>
        <nav id="global_menu" className="bg-gray-100 flex justify-center">
          <div className="max-w-[1130px] mx-auto py-4">
            <div className="animate-pulse bg-gray-200 h-6 w-full"></div>
          </div>
        </nav>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <nav id="global_menu" className="bg-gray-100 flex justify-center">
          <div className="max-w-[1130px] mx-auto py-4 text-red-600">
            メニューの読み込みに失敗しました
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="w-full mb-[40px]">
      <h3 className={styles.widget_headline}>
        <span>カテゴリー</span>
      </h3>
      <nav id="sideNavCategories" className={`${styles.category_list_widget} text-left w-full`}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.category_list_widget_li}>
              <Link href={item.uri}>
                <span className={styles.category_name}>{item.name}</span>
                <span className={styles.category_count}>{item.count}</span>
              </Link>
              {item.children && item.children.length > 0 && (
                <ul className="sub-menu">
                  {item.children.map((child) => (
                    <li key={child.id} className={styles.category_list_widget_sub_li}>
                      <Link href={child.uri}>
                        <span className={styles.category_name}>{child.name}</span>
                        <span className={styles.category_count}>{child.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavCategories;
