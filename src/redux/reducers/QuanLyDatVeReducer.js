import { thongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { QuanLyDatVeTypes } from "../actions/types/QuanLyDatVeType";

const initialState = {
  chiTietPhongVe: new thongTinLichChieu(),
  danhSachGheDangDat: [],
  tabActive: "1",
  danhSachGheKhachDat: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case QuanLyDatVeTypes.SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.payload;
      return { ...state };
    }
    case QuanLyDatVeTypes.DAT_GHE: {
      let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
      let index = danhSachGheDangDatUpdate.findIndex(
        (gheDangDat) => gheDangDat.tenGhe === action.payload.tenGhe
      );
      if (index !== -1) {
        danhSachGheDangDatUpdate.splice(index, 1);
      } else {
        danhSachGheDangDatUpdate.push(action.payload);
      }
      state.danhSachGheDangDat = danhSachGheDangDatUpdate;
      return { ...state };
    }
    case QuanLyDatVeTypes.DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }
    case QuanLyDatVeTypes.CHUYEN_TAB: {
      state.tabActive = "2";
      return { ...state };
    }
    case QuanLyDatVeTypes.CHUYEN_TAB_ACTIVE: {
      state.tabActive = action.payload;
      return { ...state };
    }

    case QuanLyDatVeTypes.DAT_GHE_REALTIME: {
      state.danhSachGheKhachDat = action.payload;
      return { ...state };
    }

    default:
      return state;
  }
};
export default reducer;
