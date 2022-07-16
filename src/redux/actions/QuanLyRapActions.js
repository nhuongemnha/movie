import { createAction } from ".";
import { quanLyRapService } from "../../services/QuanLyRapService";
import { actionType } from "./types/QuanLyRapTypes";

export const layDanhSachHeThongRap = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.layDanhSachHeThongRap();
      if (res.status === 200) {
        dispatch(createAction(actionType.SET_HE_THONG_RAP_CHIEU, res.data.content));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
