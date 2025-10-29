import React from 'react';
import Link from 'next/link';
// import styles from '../../../styles/layouts/footer/footer.module.css';

const FooterRight = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">メニュー</h4>
      <div className="textwidget custom-html-widget">
        <div className="footer_rite_menu">
          <Link href="https://www.tenpos.com/c/company" target="_blank">
            運営会社
          </Link>
          <br />
          <Link href="https://www.tenpos.co.jp/recruiting/" target="_blank">
            採用情報
          </Link>
          <br />
          <Link href="/foodmedia/contact/" target="_blank">
            お問い合わせ
          </Link>
          <br />
          <Link href="https://www.tenpos.com/p/about/privacy-policy" target="_blank">
            プライバシーポリシー
          </Link>
          <br />
          <Link href="https://www.tenpos.com/foodmedia/management/20939" target="_blank">
            記事作成依頼はこちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterRight;
