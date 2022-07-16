import { baseService } from "./base";

export class QuanLyNguoiDung extends baseService {
  constructor(props) {
    super(props);
  }

  dangNhap = (user) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, user);
  };
}

export const quanLyNguoiDung = new QuanLyNguoiDung();
