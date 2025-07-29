import React from "react";
import styles from "@/app/styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <footer className={styles.l_footer}>
      <div className={styles.container}>
        <div className={styles.open_footer}>
          <Link href="/kaigyo/openmap/">
            <Image
              src="https://www.tenpos.com/kaigyo/wp/wp-content/themes/the-thor-child/img/open_logo_footer.png"
              alt="飲食店開業マップ"
              width={237}
              height={78}
              className="rounded"
            />
          </Link>

          <ul className="flex text-center justify-center gap-10">
            <li>
              <Link href="/kaigyo/opnemap/">
                <span>テンポスの開業支援とは</span>
              </Link>
            </li>
            <li>
              <Link href="/kaigyo/contact/">
                <span>お問い合わせ</span>
              </Link>
            </li>
            <li>
              <Link href="/kaigyo/glossary/">
                <span>開業用語集</span>
              </Link>
            </li>
            <li>
              <Link href="/kaigyo/category/blog/">
                <span>開業コラム</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <div className={styles.container}>
          <div className={styles.bottomFooter__copyright}>
            Copyright © {year}{" "}
            <a
              className={styles.bottomFooter__link}
              href="https://www.tenpos.com/"
            >
              テンポスドットコム All rights reserved.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
