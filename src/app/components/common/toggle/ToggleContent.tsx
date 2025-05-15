"use client";

import React, { useState } from "react";
import styles from "@/app/styles/common/toggle/ToggleContent.module.css";

interface ToggleContentProps {
  toggleButtonText: string;
  children: React.ReactNode;
  className?: string;
}

const ToggleContent = ({
  toggleButtonText,
  children,
  className = "",
}: ToggleContentProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    console.log("isVisible", isVisible);
  };

  return (
    <>
      <div
        className={`${styles.toggle_btn} sp-dis ${styles[isVisible ? "active" : ""]} ${className}`}
        onClick={toggleVisibility}
      >
        {toggleButtonText}
      </div>
      <div
        className={`${styles.toggle_contents} inner ${isVisible ? "" : "hidden"} ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default ToggleContent;
