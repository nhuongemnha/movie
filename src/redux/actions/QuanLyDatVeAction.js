import { createAction } from ".";
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
  return async (dispatch) => {
    try {
      dispatch(displayLoadingAction);
      const res = await quanLyDatVeService.datVe(thongTinDatVe);
      await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
      console.log(res);
      await dispatch(createAction(QuanLyDatVeTypes.DAT_VE_HOAN_TAT));
      await dispatch(hideLoadingAction);
      dispatch(createAction(QuanLyDatVeTypes.CHUYEN_TAB));
      await dispatch(layThongTinNguoiDungAction());
    } catch (err) {
      dispatch(createAction(hideLoadingAction));
      console.log(err.response.data);
    }
  };
};
