import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";
import ErrorIcon from "./ErrorIcon";
import FormGroup from "./FormGroup";

const DateTimePickerWrapper = ({
  startDate: initialDate,
  strictParsing,
  onChange,
  format = "dd-MM-yyyy",
  yearsRange = [getYear(new Date()) - 100, getYear(new Date()) + 100],
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  label,
  required,
  tooltipMessage,
  errorMessage,
  // inputClassName,
  conClassName,
  // disabled,
  ...props
}) => {
  const [startDate, setStartDate] = useState("");
  const years = Array.from(
    { length: yearsRange[1] - yearsRange[0] + 1 },
    (_, i) => yearsRange[0] + i
  );

  const ExampleCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <>
      <FormGroup
      // inputClassName={inputClassName}
        onChange={onChange}
        onClick={onClick}
        uref={ref}
        value={value}
        label={label}
        placeholder={""}
        conClassName={conClassName}
        preventSpaces
        {...props}
      />
    </>
  ));

  useEffect(() => {
    if (initialDate) {
      setStartDate(initialDate);
    }
  }, [initialDate]);

  const handleDateChange = (date) => {
    setStartDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className={`datePicker ${props.wrapperClass}`}>
      <DatePicker
        // className={`form-control ${props.inputClassName && props.inputClassName}`}
        customInput={<ExampleCustomInput />}
        // value={props.value}
        // className="form-control"
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="m-2 mt-0 d-flex justify-content-between align-items-center">
            <button
              className="btn btn-link p-0 btn-prev"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              {/* {"<"} */}
            </button>
            <select
              className="form-select p-1 mx-1 lh-1 yearPicker"
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="form-select p-1 mx-1 lh-1 monthPicker"
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              className="btn btn-link p-0 btn-next"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              {/* {">"} */}
            </button>
          </div>
        )}
        selected={startDate}
        onChange={handleDateChange}
        dateFormat={format}
        {...props}
      />
    </div>
  );
};

export default DateTimePickerWrapper;
