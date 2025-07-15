import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせありがとうございます - FoodMedia",
  description:
    "お問い合わせいただきありがとうございます。内容を確認の上、担当者よりご連絡いたします。",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <div>
      お問い合わせいただきありがとうございます。
      <br />
      お問い合わせ内容を確認の上、担当者よりご連絡いたします。
    </div>
  );
};

export default page;
