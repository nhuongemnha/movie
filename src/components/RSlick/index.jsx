import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { createAction } from "../../redux/actions";
import { actionType } from "../../redux/actions/types/QuanLyPhimTypes";
import Film_Flip from "../Film";
import styleSlick from "./MultipleRowSlick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}

const MultipleRowSlick = (props) => {
  const { dangChieu, sapChieu } = useSelector(
    (state) => state.QuanLyPhimReducer
  );

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";
  let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";
  const dispatch = useDispatch();
  const renderFilms = () => {
    return props.arrFilm.map((item, index) => {
      return (
        <div className={`${styleSlick["width-item"]}`} key={index}>
          <Film_Flip phim={item} />
        </div>
      );
    });
  };
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div>
      <button
        type="button"
        className={`${styleSlick[activeClassDC]} px-8 py-4 ml-2 font-semibold rounded bg-white border-gray-800 border text-gray-800`}
        onClick={() => {
          dispatch(createAction(actionType.SET_PHIM_DANG_CHIEU));
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        onClick={() => {
          dispatch(createAction(actionType.SET_PHIM_SAP_CHIEU));
        }}
        type="button"
        className={`${styleSlick[activeClassSC]} relative px-8 py-4 ml-4 overflow-hidden font-semibold rounded bg-gray-800 text-gray-50`}
      >
        PHIM SẮP CHIẾU
        <span className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-green-600">
          New
        </span>
      </button>

      <Slider {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRowSlick;
