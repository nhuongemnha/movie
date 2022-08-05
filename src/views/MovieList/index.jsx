import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../templates/HomeTemplate";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimPhanTrang } from "../../redux/actions/QuanLyPhimAction";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { YoutubeFilled } from "@ant-design/icons";
const MovieList = () => {
  const dispatch = useDispatch();
  const count = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const actions = useCallback(() => {
    dispatch(layDanhSachPhimPhanTrang(currentPage, count));
  }, [currentPage, dispatch]);
  useEffect(() => {
    actions();
  }, [actions]);
  const handleChangePage = (value) => {
    setCurrentPage(value);
  };
  const { moviePagination } = useSelector((state) => state.QuanLyPhimReducer);
  console.log(moviePagination, "moviePagination");
  return (
    <Layout>
      <section className="container text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {moviePagination.items?.map((item) => {
              return (
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex justify-center items-center flex-col">
                    <img
                      src={item.hinhAnh}
                      className="w-40 h-52 object-contain"
                      alt=""
                    />
                    <span className="mt-1 flex justify-center text-gray-500 text-sm">
                      {moment(item.ngayKhoiChieu).format("DD.MM.YYYY")}
                    </span>
                  </div>
                  <div className="ml-5 md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {item.tenPhim}
                    </h2>
                    <p className="leading-relaxed">{item.moTa}</p>
                    <button className="text-2xl">
                          <YoutubeFilled />
                    </button>
                    <NavLink
                      to={`/detail/${item.maPhim}`}
                      className="text-indigo-500 inline-flex items-center mt-4"
                    >
                      Xem Thêm
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Pagination
        className="flex justify-center"
        defaultCurrent="1"
        onChange={handleChangePage}
        total={moviePagination.totalCount + 20}
      />
      ;
    </Layout>
  );
};

export default MovieList;
