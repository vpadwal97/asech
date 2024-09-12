import React from "react";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";
import { Form } from "react-bootstrap";

const FormGroupRadio = ({ ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.title} <span className={props.required}></span>
        {props.tooltipMessage && (
          <IoIosInformationCircleCustom tooltipMessage={props.tooltipMessage} />
        )}
      </Form.Label>
      <Form.Check
        className=""
        type="switch"
        id="custom-switch"
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        defaultChecked={true}
      />
    </Form.Group>
  );
};

export default FormGroupRadio;
