import React, { useState } from "react";
import AdminTemplate from "../../../../templates/AdminTemplate";
import { Form, Input } from "antd";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { GROUPID } from "../../../../util/settings/config";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { capNhatThongTinNguoiDung } from "../../../../redux/actions/QuanLyNguoiDungAction";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    matKhau: yup.string().required("Password is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    soDT: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]+$/g, "phone must be a number"),
    hoTen: yup.string().required("Name is required"),
  });

  const { taiKhoan } = useParams();
  const [componentSize, setComponentSize] = useState("default");
  const { Option } = Select;
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const formik = useFormik({
    initialValues: {
      taiKhoan: taiKhoan,
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

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
    console.log(formik.values);

    dispatch(capNhatThongTinNguoiDung(formik.values, navigate));
  };
  const handleSelectGroup = (value) => {
    formik.setFieldValue("maNhom", value);
    console.log(value);
  };

  const handleSelectUserType = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
    console.log(value);
  };
  return (
    <AdminTemplate>
      <Form
        onSubmitCapture={handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className="text-4xl ">Sửa Thông Tin Người Dùng</h3>
        <Form.Item label="Tài Khoản">
          <Input placeholder={taiKhoan} disabled name="taiKhoan" />
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <Input
              onBlur={formik.handleBlur}
              style={{ borderColor: "red" }}
              onChange={formik.handleChange}
              type="password"
              name="matKhau"
              placeholder={`${formik.errors.matKhau}`}
            />
          ) : (
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              name="matKhau"
            />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {formik.touched.email && formik.errors.email ? (
            <Input
              style={{ borderColor: "red" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
              placeholder={`${formik.errors.email}`}
            />
          ) : (
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
            />
          )}
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          {formik.touched.soDT && formik.errors.soDT ? (
            <Input
              style={{ borderColor: "red" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="soDT"
              placeholder={`${formik.errors.soDT}`}
            />
          ) : (
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="soDT"
            />
          )}
        </Form.Item>
        <Form.Item label="hoTen">
          {formik.touched.soDT && formik.errors.soDT ? (
            <Input
              style={{ borderColor: "red" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="hoTen"
              placeholder={`${formik.errors.hoTen}`}
            />
          ) : (
            <Input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="hoTen"
            />
          )}
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Select
            size="middle"
            onChange={handleSelectGroup}
            className="form-control block w-full  py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue="GP01"
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
        </Form.Item>
        <Form.Item label="Mô tả">
          <Select
            size="middle"
            className="form-control block w-full  py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue="KhachHang"
            onChange={handleSelectUserType}
          >
            <Option value="KhachHang">KhachHang</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <button className="bg-blue-300 text-white p-2" type="submit">
            Sửa Người Dùng
          </button>
        </Form.Item>
      </Form>
    </AdminTemplate>
  );
};

export default EditUser;
