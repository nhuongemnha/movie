import React, { Fragment, useCallback, useEffect } from "react";
import AdminTemplate from "../../../templates/AdminTemplate";
import { Button, Input, Table } from "antd";
import {
  AudioOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhim,
  xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const Films = () => {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
  console.log(arrFilmDefault, "arrFilmDefault");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const action = useCallback(() => {
    dispatch(layDanhSachPhim());
  }, [dispatch]);

  useEffect(() => {
    action();
  }, [action]);

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      value: (text, object, index) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend"],
      width: "15%",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              key={index}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
              className="w-12 h-12 "
              src={film.hinhAnh}
              alt=""
            />
          </Fragment>
        );
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      width: "15%",
    },
    {
      title: "Tên Phim ",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim;
        let tenPhimB = b.tenPhim.toLowerCase().trim;
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",

      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              to={`/admin/films/edit/${film.maPhim}`}
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
                  window.confirm("Are you sure you want to delete this movie?")
                ) {
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
              className=" text-white cursor-pointer text-2xl"
            >
              <DeleteOutlined
                style={{ color: "red" }}
                className="text-blue-900"
              />
            </span>
            <NavLink
              onClick={() => {
                localStorage.setItem('filmParams',JSON.stringify(film));
              }}
              key={3}
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              className="ml-3 text-white text-2xl"
            >
              <CalendarOutlined
                style={{ color: "orange" }}
                className="text-yellow-600"
              />
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];
  const data = arrFilmDefault;
  const { Search } = Input;
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSearch = (value) => {
    dispatch(layDanhSachPhim(value));
  };

  return (
    <AdminTemplate>
      <div>
        <h3 className="text-4xl"> Quản Lý Phim</h3>
        <Button
          onClick={() => {
            navigate("/admin/films/addnew");
          }}
          className="mb-5"
        >
          Thêm Phim
        </Button>
        <Search
          placeholder="input search text"
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={onSearch}
        />
        <Table
          rowKey={"maPhim"}
          className="mt-5"
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </div>
    </AdminTemplate>
  );
};

export default Films;
