import { createAction } from ".";
import { quanLyRapService } from "../../services/QuanLyRapService";
import { actionType } from "./types/QuanLyRapTypes";

export const layThongTinHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyRapService.layThongTinHeThongRap();
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
