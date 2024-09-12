import React from "react";
import { Form } from "react-bootstrap";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";

const FormCheckRadio = ({ ...props }) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <div className="row">
          <Form.Label className={`fw-bold ${props.mlabelClass}`}>
            {props.mlabel}
            <span className={props.required}></span>
            {props.tooltipMessage && (
              <IoIosInformationCircleCustom
                tooltipMessage={props.tooltipMessage}
              />
            )}
          </Form.Label>
        </div>
        <Form.Check
          inline
          className="ms-2 fw-semibold"
          type="radio"
          label={props.label1}
          id={props.label1?.replaceAll(/[^a-zA-Z0-9]/g, "_")}
          name={props.name}
          value={props.value1}
          onChange={props.onChange}
          checked={props.selectedOption === props.value1}
        />
        <Form.Check
          inline
         className="ms-2 fw-semibold"
          type="radio"
          label={props.label2}
          id={props.label2?.replaceAll(/[^a-zA-Z0-9]/g, "_")}
          name={props.name}
          value={props.value2}
          onChange={props.onChange}
          checked={props.selectedOption === props.value2}
        />
      </Form.Group>
    </Form>
  );
};

export default FormCheckRadio;
