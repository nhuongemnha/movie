import { createAction } from ".";
import { connection } from "../..";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { layThongTinNguoiDungAction } from "./QuanLyNguoiDungAction";
import { QuanLyDatVeTypes } from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const res = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      if (res.data.statusCode === 200) {
        dispatch(
          createAction(QuanLyDatVeTypes.SET_CHI_TIET_PHONG_VE, res.data.content)
        );
      }
    } catch (err) {
      console.log("err", err);
    }
  };
};
export const datVeAction = (thongTinDatVe) => {
  return async (dispatch, getState) => {
    try {
      dispatch(displayLoadingAction);
      const res = await quanLyDatVeService.datVe(thongTinDatVe);
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      console.log(res);
      await dispatch(createAction(QuanLyDatVeTypes.DAT_VE_HOAN_TAT));
      await dispatch(hideLoadingAction);
      let userLogin = getState().QuanLyNguoiDungReducer.UserLogin;
      await connection.invoke(
        "datGheThanhCong",
        userLogin.taiKhoan,
        thongTinDatVe.maLichChieu
      );

      dispatch(createAction(QuanLyDatVeTypes.CHUYEN_TAB));
      await dispatch(layThongTinNguoiDungAction());
    } catch (err) {
      dispatch(createAction(hideLoadingAction));
      console.log(err.response.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    await dispatch(createAction(QuanLyDatVeTypes.DAT_GHE, ghe));

    let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
    let taiKhoan = getState().QuanLyNguoiDungReducer.UserLogin.taiKhoan;
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
    connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu);
  };
};


