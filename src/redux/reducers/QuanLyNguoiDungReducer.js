import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { ThongTinNguoiDung } from "../../_core/models/ThongTinNguoiDung";
import { actionType } from "../actions/types/QuanLyNguoiDungType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  UserLogin: user,
  thongTinNguoiDung: new ThongTinNguoiDung(),
  arrUserDefault: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.DANG_NHAP: {
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.payload));
      localStorage.setItem(TOKEN, action.payload.accessToken);

      return { ...state, UserLogin: action.payload };
    }

    case actionType.SET_THONG_TIN_NGUOI_DUNG: {
      state.thongTinNguoiDung = action.payload;
      return { ...state };
    }
    case actionType.SET_DANH_SACH_NGUOI_DUNG: {
      state.arrUserDefault = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
