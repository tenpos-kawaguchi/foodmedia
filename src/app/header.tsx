import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-5 px-10 border-b flex justify-between">
      <div>
        <h1>
          <Link href={"/"}>foodmedia</Link>
        </h1>
      </div>
      <nav className="flex gap-5 items-center">
        <Link href={"/"}>店主の声</Link>
        <Link href={"/contact"}>Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
