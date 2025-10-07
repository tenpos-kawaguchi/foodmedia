import React from 'react';
import Link from 'next/link';
import FooterNav from '@/app/components/common/nav/FooterNav';
import FooterLeft from '@/app/components/layouts/footer/FooterLeft';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-black">
      <div className="mx-auto px-4 py-8 bg-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="widget_text widget_content clearfix widget_custom_html"
            id="custom_html-2"
          >
            <FooterLeft />
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">リンク</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
            <p className="text-gray-300">
              ご質問やご意見がございましたら、お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </div>

      <FooterNav />

      <div className="bg-custom-red py-6 text-center">
        <p className="text-white text-sm">
          Copyright © {currentYear} tenpos foodmedia All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
