import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  color?: "white" | "black";
  bg?: "red" | "blue";
};

const colorStyles = {
  white: "text-white",
  black: "text-black",
} as const;

const bgStyles = {
  red: "bg-red",
  blue: "bg-blue",
} as const;

const ButtonSmall = ({
  children,
  color = "white",
  bg = "red",
}: ButtonProps) => {
  const colorStyle = colorStyles[color] || "";
  const bgStyle = bgStyles[bg] || "";
  return (
    <div
      className={`flex items-center justify-center h-full w-full py-4 px-2.5 ${colorStyle} ${bgStyle} rounded-lg relative after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:inline-block after:w-[calc(100%-8px)] after:h-[calc(100%-8px)] after:rounded-lg after:border-[2px] after:border-white`}
    >
      <span
        className="text-center text-sm font-bold bg-no-repeat bg-[length:10px] pl-[15px] bg-left bg-[url('https://cms-tenpos.tenposfoodplace-hp.com/kaigyo/wp/wp-content/themes/the-thor-child/img/common/arrow-right.svg')]"
        style={{ backgroundSize: "8px" }}
      >
        {children}
      </span>
    </div>
  );
};

export default ButtonSmall;
