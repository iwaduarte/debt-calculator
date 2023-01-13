import React from "react";
import style from "./Button.module.css";

const { button } = style;

const Button = ({ title, onClick }) => {
  return (
    <button className={button} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
