import React from "react";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";
import ErrorIcon from "./ErrorIcon";

const FormTextarea = ({ ...props }) => {
  const handleKeyDown = (e) => {
    if (props.preventSpaces && e.key === " ") {
      e.preventDefault();
    }
    if (props.numOnly) {
      if (
        !/^[0-9\b]$/.test(e.key) &&
        !(e.key === "ArrowLeft" || e.key === "ArrowRight") &&
        !(e.key === "Delete" || e.key === "Backspace")
      ) {
        e.preventDefault();
      }
    }
    if (props.preventNum) {
      if (/^[0-9\b]$/.test(e.key)) {
        e.preventDefault();
      }
    }
    if (props.preventSpecialCharacters && !/^[a-zA-Z0-9]+$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    if (props.preventPaste) {
      e.preventDefault();
    }
    if (props.preventcopyCut) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div
        className={`form-group position-relative ${
          props.preventcopyCut && props.disabled ? " disabled-input " : ""
        } ${props.errorMessage ? " highlight-error " : ""} ${
          (props.conClassName && props.conClassName) || ""
        }`}
      >
        <textarea
          // className="form-control"
          cols={props.cols}
          rows={props.rows}
          className={`form-control ${
            props.inputClassName && props.inputClassName
          }`}
          id={props.label && props.label.replaceAll(/[^a-zA-Z0-9]/g, "_")}
          type={props.type}
          value={props.value}
          defaultValue={props.defaultValue}
          onClick={props.onClick}
          onChange={props.onChange}
          maxLength={props.maxLength}
          disabled={props.disabled}
          name={props.name}
          placeholder={props.placeholder || ""}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onCopy={handlePaste}
          onCut={handlePaste}
          autoComplete={props.autoComplete}
          ref={props.uref}
        />
        <label
          htmlFor={props.label && props.label.replaceAll(/[^a-zA-Z0-9]/g, "_")}
          className="bs-body-bg px-2 lh-1 d-flex align-items-center"
        >
          <span className="label overflow-hidden">{props.label}</span>
          {props.required && <span className="required"></span>}
          {props.tooltipMessage && (
            <IoIosInformationCircleCustom
              tooltipMessage={props.tooltipMessage}
            />
          )}
        </label>

        {props.errorMessage && (
          <span className="tooltipErrorMessage top-50 translate-middle-y position-absolute text-danger lh-1">
            <ErrorIcon errorMessage={props.errorMessage} />
          </span>
        )}
      </div>
    </>
  );
};

export default FormTextarea;
