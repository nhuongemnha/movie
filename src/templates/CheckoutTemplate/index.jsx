import React, { Fragment, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate replace to="/login" />;
  }
  return <Fragment>{props.children}</Fragment>;
};

export default CheckoutTemplate;
