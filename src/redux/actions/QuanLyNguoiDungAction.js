import { createAction } from ".";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { actionType } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.dangNhap(user);
      if (res.data.statusCode === 200) {
        dispatch(createAction(actionType.DANG_NHAP, res.data.content));
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (res.data.statusCode === 200) {
        dispatch(
          createAction(actionType.SET_THONG_TIN_NGUOI_DUNG, res.data.content)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};
