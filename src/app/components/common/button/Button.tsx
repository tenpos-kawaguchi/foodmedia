import React from "react";
import styles from "@/app/styles/common/button/Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  color?: "white" | "black";
  bg?: "red" | "green";
};

const Button = ({ children, color = "white", bg = "red" }: ButtonProps) => {
  return (
    <div className={`${styles.button} ${styles[color]} ${styles[bg]}`}>
      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default Button;
