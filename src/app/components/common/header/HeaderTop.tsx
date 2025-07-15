import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeaderTop = () => {
  return (
    <div className="max-w-[1130px] mx-auto py-5 px-10">
      <div id="header_top" className="flex justify-between items-center">
        <div id="header_logo">
          <h1 className="logo">
            <Link href="/" title="テンポスフードメディア">
              <Image
                className="pc_logo_image hidden md:block"
                src="https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2021/03/logo_pc.png?1752542967"
                alt="テンポスフードメディア"
                title="テンポスフードメディア"
                width="300"
                height="60"
              />
              <Image
                className="mobile_logo_image block md:hidden"
                src="https://cms-tenpos.tenposfoodplace-hp.com/foodmedia/wp-content/uploads/2021/03/logo_sp.png?1752542967"
                alt="テンポスフードメディア"
                title="テンポスフードメディア"
                width="200"
                height="40"
              />
            </Link>
          </h1>
        </div>
        <p id="site_description" className="show_desc_pc ">
          <span>全国の飲食店を応援するフードメディア</span>
        </p>

        {/* <div id="header_search">
    <form role="search" method="get" id="header_searchform" action="https://www.tenpos.com/foodmedia">
     <div class="input_area"><input type="text" value="" id="header_search_input" name="s" autocomplete="off"></div>
     <div class="button"><label for="header_search_button"></label><input type="submit" id="header_search_button" value=""></div>
    </form>
   </div> */}
      </div>
    </div>
  );
};

export default HeaderTop;
