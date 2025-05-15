import React from "react";
import Link from "next/link";
import Button from "@/app/components/common/button/Button";
import commonStyles from "@/app/styles/top/TopCommon.module.css";

const TopContact = () => {
  return (
    <div className="py-16">
      <div className={commonStyles.top_strong_txt}>
        <p>
          <span className={commonStyles.marker}>
            開業をお考えの方は、
            <br className="sp-dis" />
            テンポス開業総合窓口まで
            <br className="sp-dis" />
            お気軽にお問い合わせください。
          </span>
        </p>
      </div>
      <ul className="flex justify-center gap-4 inner flex-col md:flex-row">
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
  );
};

export default TopContact;
