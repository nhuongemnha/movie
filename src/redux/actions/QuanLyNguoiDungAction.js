import { createAction } from ".";
import { quanLyNguoiDung } from "../../services/QuanLyNguoiDung";
import { actionType } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDung.dangNhap(user);
      if (res.data.statusCode === 200) {
        dispatch(createAction(actionType.DANG_NHAP, res.data.content));
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};
