import { thongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { actionType } from "../actions/types/QuanLyDatVeType";

const initialState = {
  chiTietPhongVe: new thongTinLichChieu(),
  danhSachGheDangDat: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.payload;
      return { ...state };
    }
    case actionType.DAT_GHE: {
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
    default:
      return state;
  }
};
export default reducer;
