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
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
