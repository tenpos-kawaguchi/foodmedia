import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/layouts/footer/footer.module.css';

const FooterLeft = () => {
  return (
    <div>
      <h3 className={styles.widget_headline}>
        <span>運営会社</span>
      </h3>
      <div>
        <div className="footer_logo_box">
          <a href="https://www.tenpos.com/" target="_blank">
            <Image
              src="https://cms-tenpos.tenposfoodplace-hp.com/kaigyo/wp/wp-content/themes/the-thor-child/img/common/header_logo.png"
              alt="テンポスドットコム"
              title="テンポスドットコム"
              width={247}
              height={31}
              className="mb-5"
            />
          </a>
          <p className="leading-relaxed text-sm">
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
