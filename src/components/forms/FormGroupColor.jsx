import React from "react";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";

const FormGroupColor = ({ ...props }) => {
  return (
    <>
      <div className="form-group form-group-color">
        <input
          className="form-control"
          type="color"
          value={props.value}
          onChange={props.onChange}
          maxLength={props.maxLength}
          disabled={props.disabled}
        />
        <label>
          {props.placeholder}

          {props.tooltipMessage && (
            <IoIosInformationCircleCustom
              tooltipMessage={props.tooltipMessage}
            />
          )}
          {/* <span>
                        <IoIosInformationCircle
                            style={{ fontSize: "15px", background: "#f6f6f6" }}
                        />
                    </span> */}
        </label>
      </div>
    </>
  );
};

export default FormGroupColor;
