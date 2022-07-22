import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import "./index.css";

const AdminTemplate = (props) => {
  const { UserLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const { Header, Content, Footer, Sider } = Layout;

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(
      "Users",
      "1",
      <NavLink className="thea" to="/admin">
        <UserOutlined />
      </NavLink>
    ),
    getItem(
      "Films",
      "2",
      <NavLink className="thea" to="/admin/films">
        <FileOutlined />
      </NavLink>,
      [
        getItem(
          "Films",
          "10",
          <NavLink className="thea" to="/admin/films">
           <FileOutlined />
          </NavLink>
        ),
        getItem(
          "Add New",
          "11",
          <NavLink className="thea" to="/admin/films/addnew">
           <FileOutlined />
          </NavLink>
        ),
      ]
    ),
    getItem(
      "Showtime",
      "3",
      <NavLink className="thea" to="/admin/showtimes">
        <DesktopOutlined />
      </NavLink>
    ),
  ];

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Navigate to="/" />;
  }

  if (UserLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Navigate to="/" />;
  }

  const operations = (
    <Fragment>
      {!_.isEmpty(UserLogin) ? (
        <Fragment>
          <button
            className="pr-6"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <div className="flex text-xl items-center justify-center w-10 h-10 mt-2 bg-red-300 rounded-full">
              {UserLogin.taiKhoan.substr(0, 1)}
            </div>
          </button>
          <button
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
      ) : (
        ""
      )}
    </Fragment>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo p-5">
          <img src="https://xemphim.vip/static/skin/logo-full.png" alt="..." />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="text-right bg-white pr-10 pt-1">{operations}</div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            className="site-layout-background bg-white h-full"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
