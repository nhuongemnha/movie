import React from "react";
import { useSelector } from "react-redux";
import CheckoutTemplate from "../../templates/CheckoutTemplate";

const Checkout = () => {
  const { UserLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  return (
    <CheckoutTemplate>
      <div className="min-h-screen">
        <div className="grid grid-cols-12 ">
          <div className="col-span-9"></div>
          <div className="col-span-3">
            <h3 className="text-center text-2xl">0 Đ</h3>
            <hr />
            <h3 className="text-xl">Lật mặt 48h</h3>
            <p>Địa Điểm: BHD START - Vincom 3/2</p>
            <p>Ngày chiếu: 25/04/2021 - 12:05 Rạp 5</p>
            <hr />
            <div className="my-5 flex flex-grow">
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
            <div className="mb-0 items-center  flex flex-col justify-end">
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
