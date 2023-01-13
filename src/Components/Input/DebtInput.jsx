import React from "react";
import style from "./Input.module.css";

const { input, inputGroup, debt, icon, bRemoveLeft, bRemoveRight } = style;

const DebtInput = ({
  type = "text",
  title = "",
  prepend = "",
  append = "",
  value = "",
  onChange = null,
  placeholder = "",
}) => {
  const PrependIcon = prepend
    ? () => <div className={`${icon} ${bRemoveRight}`}>{prepend}</div>
    : () => null;
  const AppendIcon = append
    ? () => <div className={`${icon} ${bRemoveLeft}`}>{append}</div>
    : () => null;

  const _onChange = (e) => {
    const {
      target: { value },
    } = e;
    onChange(value);
  };

  const controllingComponents = onChange ? { value, onChange: _onChange } : {};

  return (
    <div className={debt}>
      <span>{title.toUpperCase()}</span>
      <div className={inputGroup}>
        <PrependIcon />
        <input
          {...controllingComponents}
          className={input}
          type={type}
          placeholder={placeholder}
        />
        <AppendIcon />
      </div>
    </div>
  );
};

export default DebtInput;
