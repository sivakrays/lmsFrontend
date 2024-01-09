import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => {
  return <ReactLoading type={type} color={color} height={"3%"} width={"3%"} />;
};

export default Loader;
