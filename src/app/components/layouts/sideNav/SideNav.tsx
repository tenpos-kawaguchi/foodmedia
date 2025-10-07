import React from 'react';
import SideNavCategories from './SideNavCategories';
import SideNavBannerBottom from './SideNavBannerBottom';
import SideNavBannerTop from './SideNavBannerTop';

const SideNav = () => {
  return (
    <div>
      <SideNavBannerTop />
      <SideNavCategories />
      <SideNavBannerBottom />
    </div>
  );
};

export default SideNav;
