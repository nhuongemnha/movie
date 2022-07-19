import { Tabs } from "antd";
import moment from "moment";
import React, { Fragment, memo, useState } from "react";
import { NavLink } from "react-router-dom";
const { TabPane } = Tabs;

const HomeMenu = (props) => {
  const [tabPosition, setTabPosition] = useState("left");
  const renderHeThongRap = () => {
    return props.heThongRapChieu.map((heThongRap, index) => {
      return (
        <TabPane
          tab={
            <img className="rounded-full w-12" src={heThongRap.logo} alt="" />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap.slice(0, 4).map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div className="flex">
                      <img className="w-12" src={cumRap.hinhAnh} />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p className="text-red-500">Chi Tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 3).map((film, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-2">
                          <div className="flex">
                            <img
                              className="w-40 h-40"
                              src={film.hinhAnh}
                              alt={film.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/200/200";
                              }}
                            />
                            <div className="ml-2 ">
                              <h1 className="text-xl text-blue-400 font-bold">
                                {film.tenPhim}
                              </h1>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-5 gap-3">
                                {film.lstLichChieuTheoPhim
                                  .slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink key={index} to="">
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
};

export default memo(HomeMenu);
