import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import CarouselReducer from "./reducers/CarouselReducer";
import QuanLyPhimReducer from "./reducers/QuanLyPhimReducer";
import QuanLyRapReducer from "./reducers/QuanLyRapReducer";
import QuanLyNguoiDungReducer from "./reducers/QuanLyNguoiDungReducer";
import QuanLyDatVeReducer from "./reducers/QuanLyDatVeReducer";

const reducer = combineReducers({
  CarouselReducer,
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
});

const store = configureStore({
  reducer,
  middleware: [thunk, logger],
});

export default store;
