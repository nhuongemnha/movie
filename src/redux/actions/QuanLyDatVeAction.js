import { createAction } from ".";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { actionType } from "./types/QuanLyDatVeType";

export const layChiTietPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const res = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
      if (res.data.statusCode === 200) {
        dispatch(
          createAction(actionType.SET_CHI_TIET_PHONG_VE, res.data.content)
        );
      }
    } catch (err) {
      console.log("err", err);
      
    }
  };
};
export const datVeAction = (thongTinDatVe) => {
  return async (dispatch) => {
    try {
      const res = await quanLyDatVeService.datVe(thongTinDatVe);
      console.log(res);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
