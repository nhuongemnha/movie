import { baseService } from "./base";

export class QuanLyNguoiDungService extends baseService {
  constructor(props) {
    super(props);
  }

  dangNhap = (user) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, user);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
