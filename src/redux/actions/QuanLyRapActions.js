import { createAction } from ".";
import { quanLyRap } from "../../services/QuanLyRap";
import { actionType } from "./types/QuanLyRapTypes";

export const layDanhSachHeThongRap = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRap.layDanhSachHeThongRap();
      if (res.status === 200) {
        dispatch(createAction(actionType.SET_HE_THONG_RAP_CHIEU, res.data.content));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
