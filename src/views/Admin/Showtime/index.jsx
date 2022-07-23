import { Button, Form, InputNumber, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import AdminTemplate from "../../../templates/AdminTemplate";
import { DatePicker } from "antd";
import { quanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { quanLyDatVeService } from "../../../services/QuanLyDatVeService";

const Showtime = (props) => {
  const { id, tenPhim } = useParams();
  console.log(id, tenPhim);
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log(values, "values");
      try {
        const res = await quanLyDatVeService.taoLichChieu(values);
        alert("Tạo lịch chiếu thành công");
        console.log(res);
      } catch (err) {
        console.log(err.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state);
  const actions = useCallback(async () => {
    try {
      const res = await quanLyRapService.layThongTinHeThongRap();
      setState({
        ...state,
        heThongRapChieu: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    actions();
  }, [actions]);

  const handleChangeHeThongRap = async (values) => {
    console.log(values);
    try {
      let res = await quanLyRapService.layThongTinCumRap(values);
      setState({
        ...state,
        cumRapChieu: res.data.content,
      });
      console.log(res.data.content);
    } catch (err) {}
  };

  const handleChangeCumRap = (values) => {
    formik.setFieldValue("maRap", values);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onChangeDate = (values, dateString) => {
    console.log("Selected Time: ", values);
    console.log("Formatted Selected Time: ", dateString);
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );
    console.log(moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };

  const onChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values);
  };
  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }
  console.log(film);
  return (
    <AdminTemplate>
      <Form
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
      >
        <h3 className="text-2xl">Tạo Lịch Chiếu - {tenPhim}</h3>
        <img src={film.hinhAnh} className="w-52 h-52" alt="..." />
        <Form.Item label="Hệ thống rạp">
          <Select
            options={state.heThongRapChieu.map((htr, index) => {
              return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
            })}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
        </Form.Item>
        <Form.Item label="Cụm Rạp">
          <Select
            options={state.cumRapChieu.map((cumRap, index) => {
              return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
            })}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm rạp"
          />
        </Form.Item>
        <Form.Item label="Chọn ngày giờ chiếu">
          <DatePicker
            format="DD/MM/YYYY hh:mm:ss"
            showTime
            onChange={onChangeDate}
            onOk={onOk}
          />
        </Form.Item>

        <Form.Item label="Giá vé">
          <InputNumber
            min={75000}
            max={150000}
            onChange={onChangeInputNumber}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </AdminTemplate>
  );
};

export default Showtime;
