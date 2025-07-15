"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav.module.css";
import { useMenu } from "@/hooks/useMenu";
import type { MenuItemType } from "@/services/MenuService";

const Nav = () => {
  const { menuItems, loading, error } = useMenu();
  const pathname = usePathname();

  const isCurrentPage = (uri: string) => {
    return pathname === uri;
  };

  const isCurrentCategory = (item: MenuItemType) => {
    return pathname.startsWith(item.uri) || isCurrentPage(item.uri);
  };

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
    <div>
      <nav id="global_menu" className="bg-gray-100 flex justify-center">
        <ul
          className={`${styles.menu} flex justify-between max-w-[1130px] mx-auto`}
        >
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`${styles.menuItem} ${styles.menuItemTypeTaxonomy} ${styles.menuItemObjectCategory} ${
                item.children && item.children.length > 0
                  ? styles.menuItemHasChildren
                  : ""
              } ${
                isCurrentCategory(item) ? styles.currentCategoryAncestor : ""
              }`}
            >
              <Link href={item.uri}>{item.name}</Link>
              {item.children && item.children.length > 0 && (
                <ul className={styles.subMenu}>
                  {item.children.map((child) => (
                    <li
                      key={child.id}
                      className={`${styles.menuItem} ${styles.menuItemTypeTaxonomy} ${styles.menuItemObjectCategory} ${
                        isCurrentPage(child.uri) ? styles.currentMenuItem : ""
                      }`}
                    >
                      <Link
                        href={child.uri}
                        aria-current={
                          isCurrentPage(child.uri) ? "page" : undefined
                        }
                      >
                        {child.name}
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

export default Nav;
