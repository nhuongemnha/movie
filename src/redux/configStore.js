import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import CarouselReducer from "./reducers/CarouselReducer";
import QuanLyPhimReducer from "./reducers/QuanLyPhimReducer";
import QuanLyRapReducer from "./reducers/QuanLyRapReducer";
import QuanLyNguoiDungReducer from "./reducers/QuanLyNguoiDungReducer";
import QuanLyDatVeReducer from "./reducers/QuanLyDatVeReducer";
import LoadingReducer from "./reducers/LoadingReducer";

const reducer = combineReducers({
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk],
});

export default store;
