import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MultipleRowSlick from "../../components/RSlick";
import Layout from "../../templates/HomeTemplate";
import { dataNew } from "../../data/newsData";

import { layThongTinHeThongRapAction } from "../../redux/actions/LayThongTinHeThongRapAction";
import { layDanhSachPhim } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRap } from "../../redux/actions/QuanLyRapActions";
import HomeCarousel from "../../templates/HomeTemplate/Carousel";
import HomeMenu from "./HomeMenu/HomeMenu";
import News from "../News";
import { Link } from "react-router-dom";
import { Button, Input } from "antd";

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
            <div className="flex flex-wrap">
              <h1 className="text-gray-600 text-6xl">Phim</h1>
            </div>
            <MultipleRowSlick arrFilm={arrFilm} />
          </div>
        </section>
        <h1 className="text-gray-600 text-6xl">Rạp Phim</h1>
        <HomeMenu heThongRapChieu={heThongRapChieu} />
        <div className="flex flex-wrap mt-20 ">
          <h1 className="text-gray-600 text-6xl">Tin Tức</h1>
        </div>
        <div className="flex flex-wrap">
          {dataNew.slice(0, 6).map((data) => {
            return (
              <div className="p-4 md:w-1/3">
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-3xl overflow-hidden">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center "
                    src={data.image}
                    alt="blog"
                  />
                  <div className="p-6">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {data.title}
                    </h1>
                    <div className="flex items-center flex-wrap ">
                      <Link
                        to="/contact"
                        className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      >
                        {data.subTitle}
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                        1.2K
                      </span>
                      <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                        </svg>
                        6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            backgroundImage: "url(../assets/img/subfooter.jpg)",
          }}
          className="mt-20 brightness-90 mb-10 bg-contain z-10 w-full bg-no-repeat h-96 rounded-xl flex items-center flex-col justify-center "
        >
          <h1 className="text-orange-400 text-2xl">SUBCRIBE TO CGV</h1>
          <h2 className="text-white text-4xl">TO GET EXCLUSIVE BENIFITS</h2>
          <div>
            <Input
              style={{ width: 250, height: 40 }}
              placeholder="Your Email Address!!"
              type="text"
            />
            <Button
              style={{ height: 40 }}
              className="btn backdrop-brightness-125"
              type="primary"
              danger
            >
              Primary
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
