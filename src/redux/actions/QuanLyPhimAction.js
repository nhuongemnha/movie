import { createAction } from ".";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { actionType } from "./types/QuanLyPhimTypes";

export const layDanhSachPhim = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.layDanhSachPhim();
      dispatch(createAction(actionType.SET_DANH_SACH_PHIM, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
