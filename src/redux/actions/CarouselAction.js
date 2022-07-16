import { createAction } from ".";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { actionType } from "./types/QuanLyPhimTypes";

export const getCarousel = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.layDanhSachBanner();
      dispatch(createAction(actionType.SET_CAROUSEL, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
