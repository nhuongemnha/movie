import React, { useCallback, useEffect } from "react";
import Layout from "../../templates/HomeTemplate/HOCs/Layout";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/styles/circle.css";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";
import { layThongTinLichChieuPhim } from "../../redux/actions/LayThongTinLichChieuPhim";
import moment from "moment";

const Detail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const filmDetail = useSelector((state) => state.QuanLyRapReducer.filmDetail);
  const action = useCallback(() => {
    dispatch(layThongTinLichChieuPhim(id));
  });

  useEffect(() => {
    action();
  }, []);

  const { TabPane } = Tabs;
  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${filmDetail.hinhAnh})`,
          minHeight: "100vh",
          backgroundSize: "100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CustomCard
          style={{
            minHeight: "100vh",
            paddingTop: 150,
            backgroundColor: "rgba(0, 0, 4, 0.4)",
          }}
          effectColor="#C780FF" // required
          color="#ffffff" // default color is white
          blur={10} // default blur value is 10px
          borderRadius={0} // default border radius value is 10px
        >
          <div className="grid grid-cols-12">
            <div className="col-span-5 col-start-3">
              <div className="grid grid-cols-3">
                <img
                  className="w-64 h-72 col-span-1"
                  src={filmDetail.hinhAnh}
                  alt=""
                />
                <div className="col-span-2 ml-2 mt-14">
                  <p className="text-sm">
                    Ngày Chiếu:
                    {moment(filmDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
                  </p>
                  <p className="text-4xl leading-3">{filmDetail.tenPhim}</p>
                  <p>{filmDetail.moTa}</p>
                </div>
              </div>
            </div>
            <div className=" col-span-4 ml-8">
              <h1 className="ml-14 text-yellow-400 text-2xl font-medium">
                Đánh Giá
              </h1>
              <h1 className="text-green-400 text-2xl ml-12">
                <Rate allowHalf value={filmDetail.danhGia / 2} />
              </h1>

              <div
                className={`c100 p${filmDetail.danhGia * 10} big dark green`}
              >
                <span className="text-white">{filmDetail.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <Tabs style={{ color: "white" }} defaultActiveKey="1" centered>
              <TabPane tab="Lịch Chiếu" key="1">
                <div className="  w-2/3 mt-12 m-auto container bg-white px-5 py-5">
                  <Tabs tabPosition={"left"}>
                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                      return (
                        <TabPane
                          tab={
                            <div>
                              <img
                                className="w-12 h-12"
                                src={htr.logo}
                                alt=""
                              />
                              {htr.tenHeThongRap}
                            </div>
                          }
                          key={index}
                        >
                          {htr.cumRapChieu.map((cumRap, index) => {
                            return (
                              <div className="mt-3" key={index}>
                                <div className="flex flex-row">
                                  <img
                                    className="w-12 h-12"
                                    src={cumRap.hinhAnh}
                                    alt=""
                                  />
                                  <div className="ml-2 ">
                                    <p className="text-2xl mb-0">
                                      {cumRap.tenCumRap}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                      {cumRap.diaChi}
                                    </p>
                                  </div>
                                </div>
                                <div className="thong-tin-lich-chieu grid grid-cols-5">
                                  {cumRap.lichChieuPhim
                                    .slice(0, 6)
                                    .map((lichChieu, index) => {
                                      return (
                                        <NavLink to="#" key={index}>
                                          {moment(
                                            lichChieu.ngayChieuGioChieu
                                          ).format("hh:mm A")}
                                        </NavLink>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                        </TabPane>
                      );
                    })}
                  </Tabs>
                </div>
              </TabPane>
              <TabPane tab="Thông Tin" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Đánh Giá" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>
        </CustomCard>
      </div>
    </Layout>
  );
};

export default Detail;
