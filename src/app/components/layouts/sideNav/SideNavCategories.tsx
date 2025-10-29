'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuService, { MenuItemType } from '@/services/MenuService';
import styles from '@/app/styles/layouts/sideNav/sideNav.module.css';

const SideNavCategories = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const menuService = new MenuService();
        const categories = await menuService.getMenuCategories();
        setMenuItems(categories);
      } catch (err) {
        console.error('カテゴリデータの取得に失敗しました:', err);
        setError('カテゴリデータの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
