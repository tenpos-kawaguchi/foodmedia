import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/styles/header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="md:max-w-screen-xl mx-auto relative w-19/20">
        <h1 className={`w-1/4 py-5 ${styles["h-logo"]}`}>
          <Link href="/kaigyo/openmap/">
            <Image
              src="https://www.tenpos.com/kaigyo/wp/wp-content/themes/the-thor-child/img/common/logo.svg"
              alt="飲食店開業マップ"
              width="160"
              height="52"
              className="imgauto"
            />
          </Link>
        </h1>

        <nav className={`flex justify-end ${styles["h-nav"]}`}>
          <ul>
            <li>
              <Link href="/kaigyo/openmap/">テンポスの開業支援とは</Link>
            </li>
            <li>
              <p className={styles["hvr-ttl"]}>業種別開業支援</p>
              <ul className={styles["hvr-menu"]}>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/ramen/">
                    ラーメン店開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/cake/">
                    ケーキ・スイーツ店開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/cafe/">
                    カフェ開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/bakery/">
                    パン屋開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/yakiniku/">
                    焼肉店開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/soba-udon/">
                    そば・うどん店開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/italian/">
                    イタリアン料理店開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/izakaya/">
                    居酒屋開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/hotel/">
                    ホテル開業
                  </Link>
                </li>
                <li>
                  <Link href="https://www.tenpos.com/kaigyo/openmap/flour/">
                    粉もん屋開業
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/kaigyo/contact/">お問い合わせ</Link>
            </li>
            <li>
              <Link href="/kaigyo/glossary/">開業用語集</Link>
            </li>
            <li>
              <Link href="/kaigyo/category/blog/">開業コラム</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
