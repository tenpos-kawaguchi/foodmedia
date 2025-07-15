import React from "react";
import Nav from "@/app/components/common/nav/Nav";
import HeaderTop from "./components/common/header/HeaderTop";

const Header = () => {
  return (
    <header>
      <HeaderTop />
      <Nav />
    </header>
  );
};

export default Header;
