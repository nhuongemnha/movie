import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import _ from "lodash";
import { TOKEN, USER_LOGIN } from "../../../util/settings/config";
import { Dropdown, Menu, Space } from "antd";

const HomeHeader = () => {
  const { Option } = Select;
  const { UserLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { t, i18n } = useTranslation();
  let navigate = useNavigate();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const menu = (
    <Menu
      items={[
        {
          label: <NavLink to="/profile">Profile</NavLink>,
          key: "0",
        },
        {
          label: <NavLink to="/admin">AdminPage</NavLink>,
          key: "1",
        },
      ]}
    />
  );

  const renderLogin = () => {
    if (_.isEmpty(UserLogin)) {
      return (
        <>
          <Select
            defaultValue={"en"}
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="en">🇬🇧 English</Option>
            <Option value="vi">🇻🇳 Tiếng Việt</Option>
          </Select>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            {t("signin")}
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="self-center px-8 py-3 font-semibold bg-red-600 rounded text-gray-50"
          >
            {t("signup")}
          </button>
        </>
      );
    }
    return (
      <Fragment>
        <Dropdown className="pl-4" overlay={menu}>
          <button onClick={(e) => e.preventDefault()}>
            <Space>Hello,{UserLogin.taiKhoan}</Space>
          </button>
        </Dropdown>

        <button
          className="block ml-5 self-center px-8 py-3 font-semibold bg-red-600 rounded text-gray-50"
          onClick={() => {
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(USER_LOGIN);
            navigate("/");
            window.location.reload();
          }}
        >
          Đăng Xuất
        </button>
      </Fragment>
    );
  };

  return (
    <header className="fixed z-10 w-full p-4 text-white bg-black bg-opacity-40">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            className="w-32"
            src="https://xemphim.vip/static/skin/logo-full.png"
            alt="xemphim.club"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              {t("home")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/movie"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              {t("Movie")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              {t("contact")}
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              {t("news")}
            </NavLink>
          </li>
        </ul>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          {renderLogin()}
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
