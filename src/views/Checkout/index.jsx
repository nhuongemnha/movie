import React, { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  datGheAction,
  datVeAction,
  layChiTietPhongVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import CheckoutTemplate from "../../templates/CheckoutTemplate";
import style from "./Checkout.module.css";
import "./CheckOut.css";
import {
  CloseOutlined,
  HomeOutlined,
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
import { connection } from "../..";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";

const { TabPane } = Tabs;
const Checkout = () => {
  const navigate = useNavigate();
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

    connection.on("datVeThanhCong", () => {
      dispatch(layChiTietPhongVeAction(id));
    });
    dispatch(layThongTinNguoiDungAction());

    connection.invoke("loadDanhSachGhe", id);

    // Load danh sách ghế đang đặt từ sever về (lắng nghe tín hiệu từ server trả về)
    connection.on("loadDanhSachGheDaDat", (danhSachGheKhachDat) => {
      console.log("danhSachGheKhachDat", danhSachGheKhachDat);
      danhSachGheKhachDat = danhSachGheKhachDat.filter(
        (item) => item.taiKhoan !== UserLogin.taiKhoan
      );
      let arrGheKhachDat = danhSachGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe];
      }, []);
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");
      dispatch(createAction(QuanLyDatVeTypes.DAT_GHE_REALTIME, arrGheKhachDat));
    });

    window.addEventListener("beforeunload", clearGhe);
    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
  }, [UserLogin.taiKhoan, id, dispatch]);
  const clearGhe = function (event) {
    connection.invoke("huyDat", UserLogin.taiKhoan, id);
  };

  useEffect(() => {
    action();
  }, [action]);

  useEffect(() => {
    return () => {
      dispatch({
        type: QuanLyDatVeTypes.CHUYEN_TAB_ACTIVE,
        key: "1",
      });
    };
  }, [dispatch]);

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
              const action = datGheAction(ghe, id);
              dispatch(action);
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
        <div key={index} className="w-full p-2 lg:w-1/3 md:w-1/2">
          <div className="flex items-center h-full p-4 border border-gray-200 rounded-lg">
            <img
              alt="team"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/200/200";
              }}
              className="flex-shrink-0 object-cover object-center w-16 h-16 mr-4 bg-gray-100 rounded-full"
              src={ticket.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-medium text-pink-500 title-font">
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
                    <span className="text-base text-green-700" key={index}>
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
  const operations = (
    <Fragment>
      {!_.isEmpty(UserLogin) ? (
        <Fragment>
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            <div className="flex text-xl items-center justify-center w-10 h-10 mt-2 ml-5 bg-red-300 rounded-full">
              {UserLogin.taiKhoan.substr(0, 1)}
            </div>
            Hello! {UserLogin.hoTen}
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
    <div className="p-5 pt-2">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey={"1"}
        activeKey={tabActive}
        onChange={(key) => {
          dispatch(createAction(QuanLyDatVeTypes.CHUYEN_TAB_ACTIVE, key));
        }}
      >
        <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
          <CheckoutTemplate>
            <div className="h-screen">
              <div className="grid min-h-screen grid-cols-12">
                <div className="col-span-9">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-4/5 h-3 bg-black"></div>

                    <div id={`${style["trapezoid"]}`} className="text-center">
                      <h3 className="z-10 mt-3 text-xl text-black">Màn Hình</h3>
                    </div>
                    <div className="flex justify-center w-3/4 m-auto">
                      <table className="w-full divide-y table-fixed divide-gray-50">
                        <thead className="p-5 bg-gray-50">
                          <tr>
                            <th className="px-6 ">Ghế Chưa Đặt</th>
                            <th className="px-6 ">Ghế Đang Đặt</th>
                            <th className="px-6 ">Ghế VIP</th>
                            <th className="px-6 ">Ghế đã đặt</th>
                            <th className="px-6 ">GHế Mình Đặt</th>
                            <th className="px-6 ">GHế Khách Đang Đặt</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          <tr className="bg-white">
                            <td className="text-center">
                              <button className="ghe ">
                                <SyncOutlined
                                  style={{ display: "block" }}
                                  spin
                                />
                              </button>
                            </td>
                            <td className="text-center ">
                              <button className="ghe gheDangDat">
                                <SyncOutlined
                                  style={{ display: "block" }}
                                  spin
                                />
                              </button>
                            </td>
                            <td className="text-center ">
                              <button className="ghe gheVip">
                                <SyncOutlined
                                  style={{ display: "block" }}
                                  spin
                                />
                              </button>
                            </td>
                            <td className="text-center ">
                              <button className="ghe gheDaDat">
                                <SyncOutlined
                                  style={{ display: "block" }}
                                  spin
                                />
                              </button>
                            </td>
                            <td className="text-center ">
                              <button className="ghe gheDaDuocDat">
                                <SyncOutlined
                                  style={{ display: "block" }}
                                  spin
                                />
                              </button>
                            </td>
                            <td className="text-center ">
                              <button className="ghe gheKhachDangDat">
                                <SyncOutlined
                                  style={{ display: "block" }}
                                  spin
                                />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>{renderSeats()}</div>
                  </div>
                </div>
                <div className="relative col-span-3">
                  <h3 className="mt-2 text-2xl text-center text-green-500">
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
                  <div className="flex justify-between flex-grow my-5 mr-10">
                    <div className="w-4-5">
                      <span className="text-lg text-red-400">
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
                    <div className="text-right ">
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
                  <div className="absolute flex flex-col items-center justify-end w-full mb-0">
                    <div
                      onClick={() => {
                        const thongTinDatVe = new ThongTinDatVe();
                        thongTinDatVe.maLichChieu = id;
                        thongTinDatVe.danhSachVe = danhSachGheDangDat;
                        dispatch(datVeAction(thongTinDatVe));
                      }}
                      className="w-full py-3 text-2xl text-center text-white bg-green-600 rounded-lg"
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
              <div className="flex flex-col w-full mb-20 text-center">
                <h1 className="mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font">
                  Lịch Sử Đặt Vé
                </h1>
                <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                  Whatever cardigan tote bag tumblr hexagon brooklyn
                  asymmetrical gentrify, subway tile poke farm-to-table. Franzen
                  you probably haven't heard of them.
                </p>
              </div>
              <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
            </div>
          </section>
        </TabPane>
        <TabPane
          tab={
            <div className="mb-4 text-2xl">
              <NavLink to="/">
                <HomeOutlined />
              </NavLink>
            </div>
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
};

export default Checkout;
