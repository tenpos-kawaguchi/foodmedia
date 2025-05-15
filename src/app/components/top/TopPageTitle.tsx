import React from "react";
import styles from "@/app/styles/top/TopPageTitle.module.css";

interface TopPageTitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  enText?: string;
}

const titleStyles = {
  1: "h1Title",
  2: "h2Title",
  3: "h3Title",
} as const;

const TopPageTitle = ({
  children,
  level = 1,
  className = "",
  enText,
}: TopPageTitleProps) => {
  const Tag = `h${level}` as React.ElementType;
  const levelStyle = styles[titleStyles[level]] || "";

  return (
    <Tag className={`${styles.baseTitle} ${levelStyle} ${className}`}>
      <span className="text-xl md:text-4xl font-bold text-center leading-4 md:leading-none mb-2.5 block">
        {children}
      </span>
      <span className="block text-center text-red font-bold md:text-base">
        {enText}
      </span>
    </Tag>
  );
};

export default TopPageTitle;
