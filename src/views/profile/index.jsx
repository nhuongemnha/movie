import { Select } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Layout from "../../templates/HomeTemplate";
import { layThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";

const Profile = () => {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  console.log(thongTinNguoiDung, "thongTinNguoiDung");
  const { Option } = Select;
  const dispatch = useDispatch();
  const actions = useCallback(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);

  useEffect(() => {
    actions();
  }, []);
  return (
    <Layout>
      <section className="bg-gray-100  text-gray-800">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div
            style={{
              color: "white",
              backgroundImage: "url(./assets/img/slider2.jpg)",
            }}
            className="top-0 bg-contain  p-6 mt-8 w-2/4 rounded-3xl"
          >
            <h1 className="text-orange-300 text-3xl">
              Hello: {thongTinNguoiDung.hoTen}
            </h1>
            <h3 className="text-white">Total visits: 0</h3>
            <h3 className="text-white">Active visits: 0</h3>
            <h3 className="text-white">Expired visits: 0</h3>
            <h3 className="text-white">Reward Points: 0</h3>
            <h3 className="text-white">Total spending for the month: 0đ</h3>
            <h1 className="text-orange-300  text-3xl">History</h1>
          </div>
          <div className="flex flex-col justify-center p-6 text-center w-2/4">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-4xl m-auto">Change Info</p>
              </div>
              <div className="flex items-center mx-32 my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>
              <div className="mb-6">
                <input
                  disabled
                  name="taiKhoan"
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal cursor-no-drop text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder={thongTinNguoiDung.taiKhoan}
                  value={thongTinNguoiDung.taiKhoan}
                />
              </div>
              <div className="mb-6">
                <input
                  name="matKhau"
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  value={thongTinNguoiDung.matKhau}
                />
              </div>
              <div className="mb-6">
                <input
                  name="email"
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  value={thongTinNguoiDung.email}
                />
              </div>
              <div className="mb-6">
                <input
                  name="soDT"
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Phone"
                  value={thongTinNguoiDung.soDT}
                />
              </div>

              <div className="mb-6">
                <input
                  name="hoTen"
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Name"
                  value={thongTinNguoiDung.hoTen}
                />
              </div>
              <div className="mb-6">
                <Select
                  size="large"
                  className="form-control block w-full  py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={thongTinNguoiDung.maNhom}
                  defaultValue="GP01"
                >
                  <Option value="GP01">GP01</Option>
                  <Option value="GP02">GP02</Option>
                  <Option value="GP03">GP03</Option>
                  <Option value="GP04">GP04</Option>
                  <Option value="GP05">GP05</Option>
                  <Option value="GP06">GP06</Option>
                  <Option value="GP07">GP07</Option>
                  <Option value="GP08">GP08</Option>
                  <Option value="GP09">GP09</Option>
                  <Option value="GP10">GP10</Option>
                  <Option value="GP11">GP11</Option>
                  <Option value="GP12">GP12</Option>
                  <Option value="GP13">GP13</Option>
                  <Option value="GP14">GP14</Option>
                  <Option value="GP15">GP15</Option>
                </Select>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Change
                  </button>
                </div>
                <NavLink to="/login" className="text-gray-800">
                  Về trang đăng nhập
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
