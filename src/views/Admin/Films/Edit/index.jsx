import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  capNhatPhimUpLoad,
  layThongTinPhimAction,
} from "../../../../redux/actions/QuanLyPhimAction";
import AdminTemplate from "../../../../templates/AdminTemplate";
import { GROUPID } from "../../../../util/settings/config";

const Edit = () => {
  const [img, setImg] = useState("");
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);

  const actions = useCallback(() => {
    dispatch(layThongTinPhimAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    actions();
  }, [actions]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      maNhom: GROUPID,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      hinhAnh: null,
    },

    onSubmit: (values) => {
      console.log("values", values);
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      dispatch(capNhatPhimUpLoad(formData, navigate));
    },
  });
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
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
  const handleChangeFile = async (e) => {
    let file = e.target.files[0];

    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      await formik.setFieldValue("hinhAnh", file);
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImg(e.target.result);
      };
    }
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
        <h3 className="text-4xl ">Chỉnh Sửa Phim</h3>
        <Form.Item label="Tên Phim">
          <Input
            onChange={formik.handleChange}
            name="tenPhim"
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            onChange={formik.handleChange}
            name="trailer"
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            onChange={formik.handleChange}
            name="moTa"
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item className="w-full" label="Ngày Khởi Chiếu">
          <DatePicker
            onChange={handleChangeDatePicker}
            format="DD/MM/YYYY"
            value={moment(formik.values.ngayKhoiChieu)}
          />
        </Form.Item>
        <Form.Item label="Đang Chiếu">
          <Switch
            checked={formik.values.dangChieu}
            onChange={handleChangeSwitch("dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Sắp Chiếu">
          <Switch
            checked={formik.values.sapChieu}
            onChange={handleChangeSwitch("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            checked={formik.values.hot}
            onChange={handleChangeSwitch("hot")}
          />
        </Form.Item>
        <Form.Item label="Đánh Giá">
          <InputNumber
            value={formik.values.danhGia}
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
          <img
            className="w-32 object-contain h-32"
            src={img === "" ? thongTinPhim.hinhAnh : img}
            alt="..."
          />
        </Form.Item>

        <Form.Item label="">
          <button className="bg-blue-300 text-white p-2" type="submit">
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </AdminTemplate>
  );
};

export default Edit;
