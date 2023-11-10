import React from "react";
import { Link } from "react-router-dom";

const Button = ({ name, path }) => {
  return (
    <Link to={path}>
      <button className="herobtn font-semibold text-textColor">{name}</button>
    </Link>
  );
};

export default Button;
