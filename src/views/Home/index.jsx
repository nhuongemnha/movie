import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowSlick from "../../components/RSlick";
import Layout from "../../templates/HomeTemplate";

import { layThongTinHeThongRapAction } from "../../redux/actions/LayThongTinHeThongRapAction";
import { layDanhSachPhim } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRap } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Carousel";
import HomeMenu from "./HomeMenu/HomeMenu";

const Home = (props) => {
  const dispatch = useDispatch();
  const { arrFilm } = useSelector((state) => state.QuanLyPhimReducer);

  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  const action = useCallback(() => {
    dispatch(layDanhSachPhim());
    dispatch(layDanhSachHeThongRap());
    dispatch(layThongTinHeThongRapAction());
  });
  useEffect(() => {
    action();
  }, []);

  return (
    <Layout>
      <HomeCarousel />
      <div className="container m-auto">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <MultipleRowSlick arrFilm={arrFilm} />
            {/* <div className="flex flex-wrap -m-4">{renderFilms()}</div> */}
          </div>
        </section>

        <HomeMenu heThongRapChieu={heThongRapChieu} />
      </div>
    </Layout>
  );
};

export default Home;
