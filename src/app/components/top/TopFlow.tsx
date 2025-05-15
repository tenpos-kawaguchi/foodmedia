import React from "react";
import Image from "next/image";
import commonStyles from "@/app/styles/top/TopCommon.module.css";
import styles from "@/app/styles/top/TopFlow.module.css";
import TopPageTitle from "./TopPageTitle";
import Link from "next/link";
import Button from "../common/button/Button";
import ToggleContent from "../common/toggle/ToggleContent";

const TopFlow = () => {
  return (
    <section className={styles.flow_area}>
      <div className={`${styles.flow_top_area} py-16 `}>
        <TopPageTitle level={2} enText="FLOW" className="mb-7">
          開業支援フロー
        </TopPageTitle>
        <ToggleContent
          toggleButtonText="開業支援フロー図"
          className={`${styles.flow_img} inner`}
        >
          <Image
            src="https://cms-tenpos.tenposfoodplace-hp.com/kaigyo/wp/wp-content/themes/the-thor-child/img/top/sp/flow.jpg"
            alt="開業支援フロー"
            width="338"
            height="1153"
            loading="lazy"
            className="imgauto sp-dis"
          />
        </ToggleContent>
        <div className="inner">
          <Image
            src="https://cms-tenpos.tenposfoodplace-hp.com/kaigyo/wp/wp-content/themes/the-thor-child/img/top/2x/flow.jpg"
            alt="開業支援フロー"
            width="1180"
            height="400"
            loading="lazy"
            className="imgauto pc-dis"
          />
        </div>
      </div>
      <div className={`${styles.flow_bottom_area} py-16`}>
        <p className={`${styles.flow_bottom_bnr} inner`}>
          <Link
            className={styles.click_main_banner}
            href="/c/special-contents1/open-guide"
            target="_blank"
          >
            <Image
              src="https://cms-tenpos.tenposfoodplace-hp.com/kaigyo/wp/wp-content/themes/the-thor-child/img/top/contact.jpg"
              alt="飲食店を開業される方へオープンまでに必要な準備をお手伝いいたします"
              width="1180"
              height="230"
              loading="lazy"
              className="imgauto"
            />
          </Link>
        </p>
        <p
          className={`${styles.flow_open_list_dl_img} ${styles.flow_bottom_bnr} inner`}
        >
          <Link
            className={styles.click_main_banner}
            href="/kaigyo/list/"
            target="_blank"
          >
            <Image
              src="https://www.tenpos.com/kaigyo/wp/wp-content/themes/the-thor-child/img/bnr_open-list-dl.png"
              alt="飲食店開業準備リスト"
              width="1180"
              height="230"
              loading="lazy"
              className="imgauto"
            />
          </Link>
        </p>
        <div className={`${commonStyles.top_strong_txt} my-14`}>
          <p>
            開業はしたいけれど、
            <br className="sp-dis" />
            何から始めたらいいかわからない。
            <br />
            とりあえず話を聞いてみたい。
          </p>
          <p>
            <span className={commonStyles.marker}>
              そんな方は、テンポス開業総合窓口まで
              <br className="sp-dis" />
              お気軽にお問い合わせください。
            </span>
          </p>
        </div>
        <ul className="flex justify-center gap-4 inner">
          <li className="mx-5 flex-1">
            <Link href="/kaigyo/contact/" target="_blank" className="w-full">
              <Button color={"white"} bg={"red"}>
                開業に関するお問い合わせはこちら
              </Button>
            </Link>
          </li>
          <li className="mx-5 flex-1">
            <Link href="/line/" target="_blank" className="w-full">
              <Button color={"white"} bg={"green"}>
                簡単LINEで相談
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TopFlow;
