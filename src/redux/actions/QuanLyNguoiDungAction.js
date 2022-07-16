import { createAction } from ".";
import { quanLyNguoiDung } from "../../services/QuanLyNguoiDung";
import { actionType } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (user,navigate) => {
  return async (dispatch) => {
    try {
     
      const res = await quanLyNguoiDung.dangNhap(user);
      if (res.data.statusCode === 200) {
        dispatch(createAction(actionType.DANG_NHAP, res.data.content));
        navigate(-1)
      }
    } catch (err) {
      console.log(err);
    }
  };
};
