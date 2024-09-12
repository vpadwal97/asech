// FormSelect.js
import React, { useEffect } from "react";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";
import ErrorIcon from "./ErrorIcon";

const FormSelect = ({ ...props }) => {
  const findParentWithClass = (element, className) => {
    let parent = element.parentElement;
    while (parent) {
      if (parent.classList.contains(className)) {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  };

  useEffect(() => {
    const selects = document.querySelectorAll(".form-group .form-select");
    const handleSelectLabel = (element) => {
      const selectedIndex = element.selectedIndex;
      const parentElements = findParentWithClass(element, "form-group");
      const labelElements = parentElements.querySelector("label");
      selectedIndex === 0 && document.activeElement !== element
        ? labelElements?.classList.replace("label_top","selectLabel")
        : labelElements?.classList.replace("selectLabel","label_top");
    };

    const handleFocus = (element) => {
      const parentElements = findParentWithClass(element, "form-group");
      const labelElements = parentElements.querySelector("label");
      labelElements?.classList.replace("selectLabel","label_top");
    };

    const handleFocusOut = (element) => {
      const parentElements = findParentWithClass(element, "form-group");
      const labelElements = parentElements.querySelector("label");
      labelElements?.classList.replace("label_top","selectLabel");
      handleSelectLabel(element);
    };

    selects.forEach((element) => {
      element.addEventListener("change", () => handleSelectLabel(element));
      element.addEventListener("focus", () => handleFocus(element));
      element.addEventListener("focusout", () => handleFocusOut(element));
    });

    selects.forEach((element) => {
      handleSelectLabel(element);
    });

    // Cleanup function
    return () => {
      selects.forEach((element) => {
        element.removeEventListener("change", () => handleSelectLabel(element));
        element.removeEventListener("focus", () => handleFocus(element));
        element.removeEventListener("focusout", () => handleFocusOut(element));
      });
    };
  }, []); // Empty dependency array means this effect will run once after the initial render

  return (
    <div
      className={`form-group position-relative  ${
        props.errorMessage && "highlight-error" || ""
      } ${props.conClassName && props.conClassName || ""}`}
    >
      <select
        className={`form-select form-control ${props.inputClassName && props.inputClassName || ""}`}
        id={props.label.replace(" ", "_")}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        disabled={props.disabled}
      >
        {!props.noPleaseSelect && <option value="">Please Select</option>}

        {props.dropdownlist?.map((option) =>
          props.defaultValueOption ? (
            <option
              defaultValue={props.defaultValueOption === option.optionValue}
              key={option.optionValue}
              value={props.selectedOption || props.value} // Use selectedOption or value as value prop
            >
              {option.optionLabel}
            </option>
          ) : (
            <option
              defaultValue={option.optiondefaultValue}
              key={option.optionValue}
              value={option.optionValue}
            >
              {option.optionLabel}
            </option>
          )
        )}
      </select>
      {/* {((props.value === "PleaseSelect") ? label_top="label_top" : label_top='')} */}
      <label
        className={`bs-body-bg px-2 py-0 lh-1 d-flex align-items-center h-auto selectLabel`}
        htmlFor={props.label.replace(" ", "_")}
      >
        <span className="label overflow-hidden">{props.label}</span>
        {props.required && <span className="required"></span>}
        {props.tooltipMessage && (
          <IoIosInformationCircleCustom tooltipMessage={props.tooltipMessage} />
        )}
      </label>

      {props.errorMessage && (
        <span className="tooltipErrorMessage top-50 translate-middle-y position-absolute text-danger lh-1">
          <ErrorIcon errorMessage={props.errorMessage} />
        </span>
      )}
    </div>
  );
};

export default FormSelect;
