import { actionType } from "../actions/types/QuanLyPhimTypes";

const initialState = {
  arrFilm: [],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  thongTinPhim: {},
  moviePagination:{}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_DANH_SACH_PHIM: {
      state.arrFilm = action.payload;
      state.arrFilmDefault = state.arrFilm;
      return { ...state };
    }
    case actionType.SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (item) => item.dangChieu === state.dangChieu
      );
      return { ...state };
    }
    case actionType.SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilm = state.arrFilmDefault.filter(
        (item) => item.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    case actionType.SET_THONG_TIN_PHIM: {
      state.thongTinPhim = action.payload;
      return { ...state };
    }
    case actionType.SET_PAGINATION_PHIM: {
      state.moviePagination = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
