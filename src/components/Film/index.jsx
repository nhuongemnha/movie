import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./Film_Flip.css";

const Film_Flip = (props) => {
  const { phim } = props;
  return (
    <Fragment>
      <div className="flip-card mt-2">
        <div className="flip-card-inner">
          <div className="flip-card-front ">
            <img
              src={phim.hinhAnh}
              alt="Avatar"
              style={{ width: 300, height: 300 }}
            />
          </div>
          <div
            className="flip-card-back "
            style={{
              position: "relative",
              backgroundColor: "rgba(0,0,0,.9)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <img
                src={phim.hinhAnh}
                alt="Avatar"
                style={{ width: 300, height: 300 }}
              />
            </div>
            <div
              className="w-full h-full absolute flex justify-center items-center"
              style={{ backgroundColor: "rgba(0,0,0,.5)" }}
            >
              <div>
                <div className="text-xl mt-2 font-bold">{phim.tenPhim}</div>
                <div className="mt-2 font-bold">
                  {phim.moTa.substr(0, 100) + "..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <NavLink
          to={`/detail/${phim.maPhim}`}
          style={{ width: 220 }}
          className="block text-center h-10 cursor-pointer items-center m-auto ml-10 mt-4 p-2 bg-indigo-300 text-white font-bold"
        >
          Đặt Vé
        </NavLink>
      </div>
    </Fragment>
  );
};

export default Film_Flip;
