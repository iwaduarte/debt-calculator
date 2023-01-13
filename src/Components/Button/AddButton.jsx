import React from "react";
import { FaPlus } from "react-icons/fa";
import style from "./AddButton.module.css";

const { icon, add } = style;

const AddButton = ({ title, onClick, iconColor = "#06A9DB" }) => {
  return (
    <div className={add} onClick={onClick}>
      <FaPlus className={icon} color={iconColor} size={15} />
      <a>{title}</a>
    </div>
  );
};

export default AddButton;
