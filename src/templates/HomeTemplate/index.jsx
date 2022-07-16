import React, { Fragment } from "react";
import Footer from "./Footer";
import HomeHeader from "./Header";

const Layout = (props) => {
  return (
    <Fragment>
      <HomeHeader />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;
