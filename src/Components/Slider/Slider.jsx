import React from "react";
import style from "./Slider.module.css";
import ReactSlider from "react-slider";

const { slider, thumb, captions, slideGroup } = style;

const Slider = ({ min, max, unit, value, onChange }) => {
  return (
    <div className={slideGroup}>
      <ReactSlider
        className={slider}
        defaultValue={0}
        min={min}
        max={max}
        thumbClassName={thumb}
        trackClassName={"track"}
        onChange={onChange}
        value={value}
      />
      <div className={captions}>
        <span>
          {min}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
};

export default Slider;
