import { actionType } from "../actions/types/QuanLyPhimTypes";

const initialState = {
  arrBanner: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_CAROUSEL: {
      state.arrBanner = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};
export default reducer;
