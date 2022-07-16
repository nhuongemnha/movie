import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { layChiTietPhongVeAction } from "../../redux/actions/QuanLyDatVeAction";
import CheckoutTemplate from "../../templates/CheckoutTemplate";
import style from "./Checkout.module.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { UserLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { chiTietPhongVe } = useSelector((state) => state.QuanLyDatVeReducer);
  console.log(chiTietPhongVe, "chiTietPhongVe");
  const action = useCallback(() => {
    dispatch(layChiTietPhongVeAction(id));
  });

  useEffect(() => {
    action();
  }, []);

  return (
    <CheckoutTemplate>
      <div className="min-h-screen">
        <div className="grid grid-cols-12 min-h-screen">
          <div className="col-span-9">
            <div className="flex flex-col items-center justify-center mt-5">
              <div className="bg-black h-3 w-4/5"></div>
              <div id={`${style["trapezoid"]}`} className="text-center">
                <h3 className="mt-3 z-10 text-black text-xl">Màn Hình</h3>
              </div>
            </div>
          </div>
          <div className="col-span-3 relative">
            <h3 className="text-center text-2xl mt-2">0 Đ</h3>
            <hr />
            <h3 className="text-xl">{chiTietPhongVe.thongTinPhim?.tenPhim}</h3>
            <p>Địa Điểm:{chiTietPhongVe.thongTinPhim?.diaChi}</p>
            <p>Ngày chiếu:{chiTietPhongVe.thongTinPhim?.ngayChieu}</p>
            <hr />
            <div className="my-5 flex justify-between mr-10 flex-grow">
              <div className="w-4-5">
                <span className="text-red-400 text-lg">Ghế</span>
              </div>
              <div className=" text-right ">
                <span className="text-lg">0 đ</span>
              </div>
            </div>
            <hr />
            <div className="my-5">
              <i>Email </i>
              <br />
              {UserLogin.email}
            </div>
            <hr />
            <div className="my-5">
              <i>Phone </i>
              <br />
              {UserLogin.soDT}
            </div>
            <hr />
            <div className="mb-0 w-full bottom-0 items-center absolute flex flex-col justify-end">
              <div className="py-3 text-2xl bg-green-500 text-center text-white w-full">
                ĐẶT VÉ
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutTemplate>
  );
};

export default Checkout;
