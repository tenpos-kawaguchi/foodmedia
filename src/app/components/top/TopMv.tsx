import React from "react";
import Image from "next/image";
import styles from "@/app/styles/top/topMv.module.css";
import commonStyles from "@/app/styles/top/TopCommon.module.css";
import TopPageTitle from "@/app/components/top/TopPageTitle";

const TopMv = () => {
  return (
    <div>
      <section className={styles.topArea}>
        <div className={styles.top_bg}>
          <div className={styles.top_imgArea}>
            <p className={styles.top_img}>
              <Image
                src="https://www.tenpos.com/kaigyo/wp/wp-content/themes/the-thor-child/img/top/top.png"
                alt="開業マップ"
                width={1000}
                height={329}
                className="imgauto"
              />
            </p>
            <p className={styles.top_contact}>
              <span className={styles.txt}>お電話でのお問い合わせ</span>
              <span className={`${styles.num} roboto700`}>
                <a className={styles.click_mv_tel} href="tel:050-3159-8463">
                  050-3159-8463
                </a>
              </span>
              <span className={styles.txt}>受付時間：平日10:00~17:00</span>
            </p>
          </div>
        </div>
        <div className={`${styles.top_sec_ttl_area} ${styles.sp_inner}`}>
          <TopPageTitle level={2} enText="ABOUT">
            テンポスの開業支援とは？
          </TopPageTitle>
        </div>
        <div className={commonStyles.top_strong_txt}>
          <p>
            飲食店開業の
            <span className={commonStyles.marker}>
              事業計画、
              <br />
              資金調達、物件・内装、厨房機器
            </span>
            など
            <br />
            テンポスが道案内いたします
          </p>
        </div>
        <div className={`${commonStyles.top_txt} ${commonStyles.inner} inner`}>
          <p>
            これから飲食店の開業をお考えですか？
            <br />
            飲食店の新規開業は、ワクワクする気持ちと共に、不安、疑問が混在されているものと思います。
          </p>
          <p>
            飲食店開業をお考えの方が、まず行うべきことである事業計画などの事前準備から、資金調達の方法、物件の探し方、内外装について、必要な厨房機器や設備と選び方、集客の方法など、オープンするまで、そしてオープンした後のことまで、皆様の不安・疑問が解消されますよう、詳しくご説明・ご案内いたします。
          </p>
          <p>
            テンポスでは、飲食店を開業される皆様の夢と熱い想いに寄り添い、皆様が永くご店舗を経営していただけるよう、しっかりサポートさせていただきます。
          </p>
        </div>
      </section>
    </div>
  );
};

export default TopMv;
