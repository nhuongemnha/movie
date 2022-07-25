import { GROUPID } from "../util/settings/config";
import { baseService } from "./base";

export class QuanLyNguoiDungService extends baseService {
  constructor(props) {
    super(props);
  }

  dangNhap = (user) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, user);
  };

  layThongTinNguoiDung = () => {
    return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };
  dangKy = (user) => {
    return this.post(`/api/QuanLyNguoiDung/DangKy`, user);
  };
  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa !== "") {
      return this.get(
        `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
      );
    }
    return this.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  themNguoiDung = (nd) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nd);
  };
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
  capNhatThongTinNguoiDung = (nd) => {
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, nd);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
