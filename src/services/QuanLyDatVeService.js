import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./base";

export class QuanLyDatVeService extends baseService {
  constructor() {
    super();
  }
  layChiTietPhongVe = (maLichChieu) => {
    return this.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };
  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
  };
  taoLichChieu = (values) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`,values)
  };
}

export const quanLyDatVeService = new QuanLyDatVeService();
