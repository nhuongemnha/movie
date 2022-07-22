import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { Formik, useFormik } from "formik";
import { min } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { themPhimUpLoadHinhAction } from "../../../../redux/actions/QuanLyPhimAction";
import AdminTemplate from "../../../../templates/AdminTemplate";
import { GROUPID } from "../../../../util/settings/config";
import { ThongTinPhim } from "../../../../_core/models/ThongTinPhongVe";

const AddNew = (props) => {
  const [imgSrc, setImgSrc] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      maNhom: GROUPID,
    },

    onSubmit: (values) => {
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      dispatch(themPhimUpLoadHinhAction(formData));
    },
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu ", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeFile = (e) => {
    let file = e.target.files[0];
    if (
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);
      };
    }
    formik.setFieldValue("hinhAnh", file);
  };

  return (
    <AdminTemplate>
      <Form
        onSubmitCapture={formik.handleSubmit}
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
        <h3 className="text-4xl ">Thêm Phim mới</h3>
        <Form.Item label="Tên Phim">
          <Input onChange={formik.handleChange} name="tenPhim" />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input onChange={formik.handleChange} name="trailer" />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input onChange={formik.handleChange} name="moTa" />
        </Form.Item>
        <Form.Item className="w-full" label="Ngày Khởi Chiếu">
          <DatePicker onChange={handleChangDatePicker} format={"DD/MM/YYYY"} />
        </Form.Item>
        <Form.Item label="Đang Chiếu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp Chiếu">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Đánh Giá">
          <InputNumber
            min={1}
            max={10}
            onChange={handleChangeInputNumber("danhGia")}
          />
        </Form.Item>
        <Form.Item onChange={handleChangeFile} label="Hình Ảnh">
          <input
            accept="image/png, image/jpeg,image/gif,image/png"
            type="file"
          />
          <img className="w-32 object-contain h-32" src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item label="">
          <button className="bg-blue-300 text-white p-2" type="submit">
            Thêm Phim
          </button>
        </Form.Item>
      </Form>
    </AdminTemplate>
  );
};

export default AddNew;
