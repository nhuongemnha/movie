import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { actionType } from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  UserLogin: user,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DANG_NHAP: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
      localStorage.setItem(TOKEN, action.payload.accessToken);

      return { ...state, UserLogin: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
