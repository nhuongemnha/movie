import { Select } from "antd";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { dangKy } from "../../redux/actions/QuanLyNguoiDungAction";
import UserTemplate from "../../templates/UserTemplate";
import * as yup from "yup";
import { TOKEN } from "../../util/settings/config";

const Register = () => {
  const schema = yup.object().shape({
    taiKhoan: yup.string().required("User is required"),
    matKhau: yup.string().required("Password is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    soDT: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]+$/g, "phone must be a number")
      .max(11)
      .min(9),
    hoTen: yup.string().required("Name is required"),
  });

  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: "",
      hoTen: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });
  if (localStorage.getItem(TOKEN)) {
    return <Navigate to="/" />;
  }
  console.log(formik.values);
  const handleSubmit = (e) => {
    e.preventDefault();
    formik.setTouched({
      taiKhoan: true,
      matKhau: true,
      email: true,
      soDT: true,
      hoTen: true,
    });
    if (!formik.isValid) return;

    dispatch(dangKy(formik.values, navigate));
  };
  const handleChangeGroup = (value) => {
    console.log(value);
    formik.setFieldValue("maNhom", value);
  };
  return (
    <UserTemplate>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-4xl m-auto">Register</p>
          </div>
          <div className="flex items-center mx-32 my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>
          <div className="mb-6">
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="taiKhoan"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder={`${formik.errors.taiKhoan}`}
              />
            ) : (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="taiKhoan"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Account"
              />
            )}
          </div>
          <div className="mb-6">
            {formik.touched.matKhau && formik.errors.matKhau ? (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="matKhau"
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder={formik.errors.matKhau}
              />
            ) : (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="matKhau"
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
              />
            )}
          </div>
          <div className="mb-6">
            {formik.touched.email && formik.errors.email ? (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder={formik.errors.email}
              />
            ) : (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Email address"
              />
            )}
          </div>
          <div className="mb-6">
            {formik.touched.soDT && formik.errors.soDT ? (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="soDT"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder={formik.errors.soDT}
              />
            ) : (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="soDT"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Phone"
              />
            )}
          </div>

          <div className="mb-6">
            {formik.touched.hoTen && formik.errors.hoTen ? (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="hoTen"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-red-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder={formik.errors.hoTen}
              />
            ) : (
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="hoTen"
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Name"
              />
            )}
          </div>
          <div className="mb-6">
            <Select
              size="large"
              className="form-control block w-full  py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              defaultValue="GP01"
              onChange={handleChangeGroup}
            >
              <Option value="GP01">GP01</Option>
              <Option value="GP02">GP02</Option>
              <Option value="GP03">GP03</Option>
              <Option value="GP04">GP04</Option>
              <Option value="GP04">GP05</Option>
              <Option value="GP04">GP06</Option>
              <Option value="GP04">GP07</Option>
              <Option value="GP04">GP08</Option>
              <Option value="GP04">GP09</Option>
              <Option value="GP04">GP10</Option>
              <Option value="GP04">GP11</Option>
              <Option value="GP04">GP12</Option>
              <Option value="GP04">GP13</Option>
              <Option value="GP04">GP14</Option>
              <Option value="GP04">GP15</Option>
            </Select>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Sign Up
              </button>
            </div>
            <NavLink to="/login" className="text-gray-800">
              Về trang đăng nhập
            </NavLink>
          </div>
        </form>
      </div>
    </UserTemplate>
  );
};

export default Register;
