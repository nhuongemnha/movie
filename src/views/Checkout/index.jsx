import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import CheckoutTemplate from "../../templates/CheckoutTemplate";
import style from "./Checkout.module.css";
import "./CheckOut.css";
import {
  CloseOutlined,
  StopOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { createAction } from "../../redux/actions";
import { QuanLyDatVeTypes } from "../../redux/actions/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { Tabs } from "antd";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import moment from "moment";

const { TabPane } = Tabs;
const Checkout = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { UserLogin, thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const action = useCallback(() => {
    dispatch(layChiTietPhongVeAction(id));
    dispatch(layThongTinNguoiDungAction());
  }, []);

  useEffect(() => {
    action();
  }, []);

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheDD = "";
      let classGheKhachDangDat = "";
      let indexGheKhachDangDat = danhSachGheKhachDat.findIndex(
        (gheKhachDangDat) => gheKhachDangDat.maGhe === ghe.maGhe
      );
      if (indexGheKhachDangDat !== -1) {
        classGheKhachDangDat = "gheKhachDangDat";
      }
      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.tenGhe === ghe.tenGhe
      );
      let classGheDaDuocDat = "";
      if (UserLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }
      if (indexGheDD !== -1) {
        classGheDD = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          <button
            onClick={() => {
              dispatch(createAction(QuanLyDatVeTypes.DAT_GHE, ghe));
            }}
            disabled={ghe.daDat || classGheKhachDangDat !== ""}
            className={classNames(
              "ghe",
              `${classGheDaDuocDat}`,
              `${classGheDD}`,
              `${classGheKhachDangDat}`,
              {
                gheVip: ghe.loaiGhe === "Vip",
                gheDaDat: ghe.daDat === true,
              }
            )}
          >
            {ghe.daDat === true ? (
              classGheDaDuocDat !== "" ? (
                <div className="w-full">
                  <UserOutlined style={{ display: "block" }} />
                </div>
              ) : (
                <div className="w-full">
                  <CloseOutlined style={{ display: "block" }} />
                </div>
              )
            ) : classGheKhachDangDat !== "" ? (
              <StopOutlined style={{ display: "block" }} />
            ) : (
              ghe.tenGhe
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  const renderTicketItem = () => {
    console.log(thongTinNguoiDung, "thongTinNguoiDung");
    return thongTinNguoiDung.thongTinDatVe.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);

      return (
        <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              alt="team"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/200/200";
              }}
              className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-pink-500 title-font font-medium text-2xl">
                {ticket.tenPhim}
              </h2>
              <p className="text-gray-500">
                <span>
                  Giờ Chiếu {moment(ticket.ngayDat).format("hh:mm A")} - Ngày
                </span>
                <span>Chiếu {moment(ticket.ngayDat).format("DD:MM:YYYY")}</span>
              </p>
              <p>
                <span className="font-bold">Địa Điểm:</span>{" "}
                {seats.tenHeThongRap}{" "}
              </p>
              <p>
                <span className="font-bold"> Tên Rạp:</span>
                {seats.tenCumRap} - <span className="font-bold">Ghế:</span>
                {ticket.danhSachGhe.map((ghe, index) => {
                  return (
                    <span className="text-green-700 text-base" key={index}>
                      {" "}
                      [{ghe.tenGhe}]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  console.log(tabActive, "tabActive");
  return (
    <Tabs
      defaultActiveKey={"1"}
      activeKey={tabActive}
      onChange={(key) => {
        dispatch(createAction(QuanLyDatVeTypes.CHUYEN_TAB_ACTIVE, key));
      }}
    >
      <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
        <CheckoutTemplate>
          <div className="h-screen">
            <div className="grid grid-cols-12 min-h-screen">
              <div className="col-span-9">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-black h-3 w-4/5"></div>

                  <div id={`${style["trapezoid"]}`} className="text-center">
                    <h3 className="mt-3 z-10 text-black text-xl">Màn Hình</h3>
                  </div>
                  <div className="flex justify-center m-auto w-3/4">
                    <table className="divide-y w-full table-fixed divide-gray-50">
                      <thead className="bg-gray-50 p-5">
                        <tr>
                          <th className=" px-6">Ghế Chưa Đặt</th>
                          <th className=" px-6">Ghế Đang Đặt</th>
                          <th className=" px-6">Ghế VIP</th>
                          <th className=" px-6">Ghế đã đặt</th>
                          <th className=" px-6">GHế Mình Đặt</th>
                          <th className=" px-6">GHế Khách Đang Đặt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        <tr className="bg-white">
                          <td className="text-center">
                            <button className="ghe ">
                              <SyncOutlined style={{ display: "block" }} spin />
                            </button>
                          </td>
                          <td className=" text-center">
                            <button className="ghe gheDangDat">
                              <SyncOutlined style={{ display: "block" }} spin />
                            </button>
                          </td>
                          <td className=" text-center">
                            <button className="ghe gheVip">
                              <SyncOutlined style={{ display: "block" }} spin />
                            </button>
                          </td>
                          <td className=" text-center">
                            <button className="ghe gheDaDat">
                              <SyncOutlined style={{ display: "block" }} spin />
                            </button>
                          </td>
                          <td className=" text-center">
                            <button className="ghe gheDaDuocDat">
                              <SyncOutlined style={{ display: "block" }} spin />
                            </button>
                          </td>
                          <td className=" text-center">
                            <button className="ghe gheKhachDangDat">
                              <SyncOutlined style={{ display: "block" }} spin />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>{renderSeats()}</div>
                </div>
              </div>
              <div className="col-span-3 relative">
                <h3 className="text-center text-2xl mt-2 text-green-500">
                  {danhSachGheDangDat
                    .reduce((tongTien, ghe) => {
                      return (tongTien += ghe.giaVe);
                    }, 0)
                    .toLocaleString()}
                  Đ
                </h3>
                <hr />
                <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                <p>Địa Điểm: {thongTinPhim.diaChi}</p>
                <p>Ngày chiếu:{thongTinPhim.ngayChieu}</p>
                <hr />
                <div className="my-5 flex justify-between mr-10 flex-grow">
                  <div className="w-4-5">
                    <span className="text-red-400 text-lg">
                      Ghế: <br />
                      {_.sortBy(danhSachGheDangDat, ["stt"]).map(
                        (gheDD, index) => {
                          return (
                            <span
                              key={index}
                              className="text-xl text-green-500"
                            >
                              {gheDD.tenGhe}{" "}
                            </span>
                          );
                        }
                      )}
                    </span>
                  </div>
                  <div className=" text-right ">
                    <span className="text-lg">
                      {danhSachGheDangDat
                        .reduce((tongTien, ghe) => {
                          return (tongTien += ghe.giaVe);
                        }, 0)
                        .toLocaleString()}
                      đ
                    </span>
                  </div>
                </div>
                <hr />
                <div className="my-5">
                  <i>Email </i>
                  <br />
                  {UserLogin.email}
                </div>
                <hr />
                <div className="my-5">
                  <i>Phone </i>
                  <br />
                  {UserLogin.soDT}
                </div>
                <hr />
                <div className="mb-0 w-full  items-center absolute flex flex-col justify-end">
                  <div
                    onClick={() => {
                      const thongTinDatVe = new ThongTinDatVe();
                      thongTinDatVe.maLichChieu = id;
                      thongTinDatVe.danhSachVe = danhSachGheDangDat;
                      dispatch(datVeAction(thongTinDatVe));
                    }}
                    className="py-3 text-2xl bg-green-600 rounded-lg text-center text-white w-full"
                  >
                    ĐẶT VÉ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CheckoutTemplate>
      </TabPane>
      <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Lịch Sử Đặt Vé
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them.
              </p>
            </div>
            <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
          </div>
        </section>
      </TabPane>
    </Tabs>
  );
};

export default Checkout;
