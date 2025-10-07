import React from 'react';
import Image from 'next/image';

const FooterLeft = () => {
  return (
    <div>
      <h3 className="widget_headline">
        <span>運営会社</span>
      </h3>
      <div className="textwidget custom-html-widget">
        <div className="footer_logo_box">
          <a href="https://www.tenpos.com/" target="_blank">
            <Image
              className="footer_logo_image"
              src="https://tools.itembox.design/item/img/header/header_logo.png?t=20210302134156"
              alt="テンポスドットコム"
              title="テンポスドットコム"
            />
          </a>
          <p className="footer_logo_text">
            テンポスフードメディア(TENPOS food
            media)はテンポスドットコムが運営する、全国の飲食店を応援するフードメディアです。
            <br />
            飲食店向けの出店開業支援・運営に役立つ経営ノウハウ、ニュースやトレンド情報、厨房用品・調理道具の選び方などを提供しています。
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterLeft;
