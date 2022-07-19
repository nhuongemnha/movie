import { LoadingOutlined } from "@ant-design/icons";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

const Loading = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  return (
    <Fragment>
      {isLoading ? (
        <div className="fixed text-center z-50 top-0 left-0 bg-opacity-80 bg-gray-800 w-full h-full bg flex justify-center items-center">
          <div className="text-4xl text-white">
            <LoadingOutlined />
            <p>Loading...</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Loading;
