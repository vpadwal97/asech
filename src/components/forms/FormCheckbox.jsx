import React from "react";
// import { Form } from "react-bootstrap";

const FormCheckbox = ({
  title,
  onChange,
  checked,
  labelClass,
  conClass,
  inputClass,
  inputName,
  id,
}) => {
  return (
    <>
      <div
        className={`form-check form-check-inline ${conClass ? conClass : ""}`}
      >
        <input
          type="checkbox"
          name={inputName}
          id={id}
          className={`form-check-input ${inputClass ? inputClass : ""}`}
          checked={checked}
          onChange={(event) => onChange(event)}
        />
        <label
          htmlFor={id}
          title={title}
          className={`form-check-label ${labelClass ? labelClass : ""}`}
        >
          {title}
        </label>
      </div>
    </>
  );
};

export default FormCheckbox;
