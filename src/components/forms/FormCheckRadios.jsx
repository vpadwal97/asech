import React from "react";
import { Form } from "react-bootstrap";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";

const FormCheckRadios = ({ ...props }) => {
  return (
    <span
      // className="d-flex align-items-center my-2"
      className={`d-inline-flex align-items-center ${props.conClass}`}
    >
      <input
        type="radio"
        name={props.name}
        id={props.label?.replaceAll(/[^a-zA-Z0-9]/g, "_")}
        value={props.value}
        checked={props.selectedOption === props.value}
        onChange={props.onChange}
        // className="form-check-input me-3 lh-1 mt-0"
        className={`form-check-input me-1 lh-1 mt-0 ${props.inputClass}`}
      />
      <label
        htmlFor={props.label?.replaceAll(/[^a-zA-Z0-9]/g, "_")}
        className={props.labelClass}
      >
        {props.label}
      </label>
    </span>
  );
};

export default FormCheckRadios;
