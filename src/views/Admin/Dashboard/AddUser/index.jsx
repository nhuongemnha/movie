import React, { useState } from "react";
import AdminTemplate from "../../../../templates/AdminTemplate";
import { Form, Input } from "antd";
import { Select } from "antd";
import { useFormik } from "formik";
import { GROUPID } from "../../../../util/settings/config";
import { useDispatch } from "react-redux";
import { themNguoiDung } from "../../../../redux/actions/QuanLyNguoiDungAction";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [componentSize, setComponentSize] = useState("default");
  const { Option } = Select;
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(themNguoiDung(formik.values,navigate));
  };

  const handleChangeGroup = (value) => {
    formik.setFieldValue("maNhom", value);
  };

  const handleChangeUser = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
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
        <h3 className="text-4xl ">Thêm Người Dùng Mới</h3>
        <Form.Item label="Tài Khoản">
          <Input onChange={formik.handleChange} name="taiKhoan" />
        </Form.Item>
        <Form.Item label="Mật Khẩu">
          <Input
            onChange={formik.handleChange}
            type="password"
            name="matKhau"
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input onChange={formik.handleChange} name="email" />
        </Form.Item>
        <Form.Item label="Số Điện Thoại">
          <Input onChange={formik.handleChange} name="soDT" />
        </Form.Item>
        <Form.Item label="Họ Tên">
          <Input onChange={formik.handleChange} name="hoTen" />
        </Form.Item>
        <Form.Item label="Mã Nhóm">
          <Select
            onChange={handleChangeGroup}
            size="middle"
            className="form-control block w-full  py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue="GP01"
          >
            <Option value="GP01">GP01</Option>
            <Option value="GP02">GP02</Option>
            <Option value="GP03">GP03</Option>
            <Option value="GP04">GP04</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Mô tả">
          <Select
            onChange={handleChangeUser}
            size="middle"
            className="form-control block w-full  py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            defaultValue="KhachHang"
          >
            <Option value="KhachHang">KhachHang</Option>
            <Option value="QuanTri">Quản trị</Option>
          </Select>
        </Form.Item>
        <Form.Item label="">
          <button className="bg-blue-300 text-white p-2" type="submit">
            Thêm Người Dùng
          </button>
        </Form.Item>
      </Form>
    </AdminTemplate>
  );
};

export default AddUser;
