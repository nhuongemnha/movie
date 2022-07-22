import React, { Fragment, useEffect } from "react";
import Footer from "./Footer";
import HomeHeader from "./Header";

const Layout = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <HomeHeader />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
