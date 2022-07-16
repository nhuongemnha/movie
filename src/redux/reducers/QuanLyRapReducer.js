import { actionType } from "../actions/types/QuanLyRapTypes";

const initialState = {
  heThongRapChieu: [],
  thongTinRapChieu: [],
  filmDetail: {},
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_HE_THONG_RAP_CHIEU: {
      state.heThongRapChieu = action.payload;
      return { ...state };
    }
    case actionType.SET_THONG_TIN_HE_THONG_RAP_CHIEU: {
      state.thongTinRapChieu = action.payload;
      return { ...state };
    }
    case actionType.SET_CHI_TIET_PHIM: {
      state.filmDetail = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
export default reducer;
