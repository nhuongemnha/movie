import { actionType } from "../actions/types/QuanLyDatVeType";

const initialState = {
  chiTietPhongVe: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CHI_TIET_PHONG_VE: {
      state.chiTietPhongVe = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
export default reducer;
