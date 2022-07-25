import { Alert } from "antd";
import { createAction } from ".";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { actionType } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.dangNhap(user);
      if (res.data.statusCode === 200) {
        dispatch(createAction(actionType.DANG_NHAP, res.data.content));
        alert("Đăng nhập thành công!");
        navigate("/home");
      }
    } catch (err) {
      alert(err.response.data.content);
      console.log(err);
    }
  };
};

export const layThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.layThongTinNguoiDung();
      if (res.data.statusCode === 200) {
        dispatch(
          createAction(actionType.SET_THONG_TIN_NGUOI_DUNG, res.data.content)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const dangKy = (user, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.dangKy(user);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data);
    }
  };
};

export const layDanhSachNguoiDung = (tuKhoa) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
      dispatch(
        createAction(actionType.SET_DANH_SACH_NGUOI_DUNG, res.data.content)
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const themNguoiDung = (nd, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.themNguoiDung(nd);
      alert("Thêm Thành Công!");
      navigate("/admin");
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const xoaNguoiDung = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      alert("Xóa Thành Công");
      dispatch(layDanhSachNguoiDung());
    } catch (err) {
      alert(err.response.data.content);
    }
  };
};

export const capNhatThongTinNguoiDung = (nd, navigate) => {
  return async (dispatch) => {
    try {
      const res = await quanLyNguoiDungService.capNhatThongTinNguoiDung(nd);
      alert("Cập nhật thành công!");
      navigate("/admin");
    } catch (error) {
      alert(error.response.data.content);
    }
  };
};
