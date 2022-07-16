import { createAction } from ".";
import { quanLyRap } from "../../services/QuanLyRap";
import { actionType } from "./types/QuanLyRapTypes";

export const layThongTinHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRap.layThongTinHeThongRap();
      dispatch(
        createAction(
          actionType.SET_THONG_TIN_HE_THONG_RAP_CHIEU,
          res.data.content
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
};
