import { createAction } from ".";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { actionType } from "./types/QuanLyPhimTypes";

export const layDanhSachPhim = (tenPhim = "") => {
  return async (dispatch) => {
    try {
      const res = await quanLyPhimService.layDanhSachPhim(tenPhim);
      dispatch(createAction(actionType.SET_DANH_SACH_PHIM, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const themPhimUpLoadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhimService.themPhimUpLoadHinh(formData);
      alert("Thêm phim thành công!");
      console.log("res", res.data.content);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const capNhatPhimUpLoad = (formData, navigate) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhimService.capNhatPhimUpLoad(formData);
      alert("Cập nhật phim thành công!");
      console.log("res", res.data.content);
      navigate("/admin/films");
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch(createAction(actionType.SET_THONG_TIN_PHIM, res.data.content));
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      let res = await quanLyPhimService.xoaPhim(maPhim);
      alert("Xóa Phim Thành Công!!!");
      dispatch(layDanhSachPhim());
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
