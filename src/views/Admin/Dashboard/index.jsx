import React, { Fragment } from "react";
import AdminTemplate from "../../../templates/AdminTemplate";
import { Button, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  layDanhSachNguoiDung,
  xoaNguoiDung,
} from "../../../redux/actions/QuanLyNguoiDungAction";
import { NavLink, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const dispatch = useDispatch();
  const { arrUserDefault } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const onSearch = (value) => {
    dispatch(layDanhSachNguoiDung(value));
  };
  const columns = [
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim;
        let hoTenB = b.hoTen.toLowerCase().trim;
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },

    {
      title: "email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      width: "20%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",

      render: (text, nguoiDung) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              to={`/admin/edituser/${nguoiDung.taiKhoan}`}
              className="mr-3 text-white text-2xl"
            >
              <EditOutlined
                style={{ color: "blue" }}
                className="text-blue-900"
              />
            </NavLink>
            <span
              key={2}
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this account?"
                  )
                ) {
                  dispatch(xoaNguoiDung(nguoiDung.taiKhoan));
                }
              }}
              className=" text-white cursor-pointer text-2xl"
            >
              <DeleteOutlined
                style={{ color: "red" }}
                className="text-blue-900"
              />
            </span>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];
  const data = arrUserDefault;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <AdminTemplate>
        <h3 className="text-4xl"> Quản Lý Người Dùng</h3>
        <Button
          onClick={() => {
            navigate("/admin/adduser");
          }}
          className="mb-5"
        >
          Thêm Người Dùng
        </Button>
        <Search
          placeholder="input search text"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
        />
        <Table
          rowKey={"taiKhoan"}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </AdminTemplate>
    </div>
  );
};

export default Dashboard;
