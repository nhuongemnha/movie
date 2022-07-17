import { Carousel } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../../redux/actions/CarouselAction";
import "./index.css";

const HomeCarousel = (props) => {
  const dispatch = useDispatch();
  const getBanner = useCallback(() => {
    dispatch(getCarousel());
  });

  useEffect(() => {
    getBanner();
  }, []);
  const { arrBanner } = useSelector((state) => state.CarouselReducer);

  const renderBanner = () => {
    return arrBanner.map((item) => {
      return (
        <div key={item.maBanner}>
          <img
            className=" w-full h-screen object-fill"
            src={item.hinhAnh}
            alt={item.hinhAnh}
          />
        </div>
      );
    });
  };

  return <Carousel autoplay effect="fade">{renderBanner()}</Carousel>;
};

export default HomeCarousel;
