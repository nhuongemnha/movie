import { LoadingTypes } from "../actions/types/LoadingType";

const initialState = {
  isLoading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LoadingTypes.DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case LoadingTypes.HIDE_LOADING: {
      state.isLoading = false;
      return { ...state };
    }

    default:
      return state;
  }
};

export default reducer;
