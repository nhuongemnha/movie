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
import { CloseOutlined, SyncOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { createAction } from "../../redux/actions";
import { actionType } from "../../redux/actions/types/QuanLyDatVeType";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

const Checkout = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { UserLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(
    (state) => state.QuanLyDatVeReducer
  );
  const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
  const action = useCallback(() => {
    dispatch(layChiTietPhongVeAction(id));
  }, []);

  useEffect(() => {
    action();
  }, []);

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheDD = "";
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
              dispatch(createAction(actionType.DAT_GHE, ghe));
            }}
            disabled={ghe.daDat}
            className={classNames(
              "ghe",
              `${classGheDaDuocDat}`,
              `${classGheDD}`,
              {
                gheVip: ghe.loaiGhe === "Vip",
                gheDaDat: ghe.daDat === true,
              }
            )}
          >
            {ghe.daDat === true ? (
              classGheDaDuocDat != "" ? (
                <div className="w-full">
                  <UserOutlined style={{ display: "block" }} />
                </div>
              ) : (
                <div className="w-full">
                  <CloseOutlined style={{ display: "block" }} />
                </div>
              )
            ) : (
              ghe.tenGhe
            )}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <CheckoutTemplate>
      <div className="min-h-screen">
        <div className="grid grid-cols-12 min-h-screen">
          <div className="col-span-9">
            <div className="flex flex-col items-center justify-center mt-5">
              <div className="bg-black h-3 w-4/5"></div>
              <div id={`${style["trapezoid"]}`} className="text-center">
                <h3 className="mt-3 z-10 text-black text-xl">Màn Hình</h3>
              </div>
              <div>{renderSeats()}</div>
            </div>
            <div className="flex justify-center m-auto w-2/3">
              <table className="divide-y w-full table-fixed divide-gray-50">
                <thead className="bg-gray-50 p-5">
                  <tr>
                    <th className=" px-6">Ghế Chưa Đặt</th>
                    <th className=" px-6">Ghế Đang Đặt</th>
                    <th className=" px-6">Ghế VIP</th>
                    <th className=" px-6">Ghế đã đặt</th>
                    <th className=" px-6">GHế Mình Đặt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="bg-white  ">
                    <td className="text-center px-6">
                      <button className="ghe ">
                        <SyncOutlined style={{ display: "block" }} spin />
                      </button>
                    </td>
                    <td className=" text-center px-6">
                      <button className="ghe gheDangDat">
                        <SyncOutlined style={{ display: "block" }} spin />
                      </button>
                    </td>
                    <td className=" text-center px-6">
                      <button className="ghe gheVip">
                        <SyncOutlined style={{ display: "block" }} spin />
                      </button>
                    </td>
                    <td className=" text-center px-6">
                      <button className="ghe gheDaDat">
                        <SyncOutlined style={{ display: "block" }} spin />
                      </button>
                    </td>
                    <td className=" text-center px-6">
                      <button className="ghe gheDaDuocDat">
                        <SyncOutlined style={{ display: "block" }} spin />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                  {_.sortBy(danhSachGheDangDat, ["stt"]).map((gheDD, index) => {
                    return (
                      <span key={index} className="text-xl text-green-500">
                        {gheDD.tenGhe}{" "}
                      </span>
                    );
                  })}
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
            <div className="mb-0 w-full bottom-0 items-center absolute flex flex-col justify-end">
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
  );
};

export default Checkout;
