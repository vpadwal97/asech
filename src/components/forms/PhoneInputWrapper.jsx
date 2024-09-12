import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FormGroup from "./FormGroup";

const PhoneInputWrapper = ({
  mainconClassName,
  country,
  valueCode,
  onChangeCode,
  placeholderCode,
  labelCode,
  ...props
}) => {
  const [phoneCode, setPhoneCode] = useState(valueCode || "");

  const handleChange = (phoneCode) => {
    setPhoneCode(phoneCode);
    onChangeCode(phoneCode);
  };

  return (
    <>
      <div className={`form-group ${mainconClassName && mainconClassName ||""}`}>
        <div className={`d-flex form-control p-0 row mx-0 ${props.containerClass && props.containerClass ||""}`}>
          <PhoneInput
            country={country || "in"}
            value={phoneCode}
            disabled={props.disabled}
            enableSearch={true}
            inputClass={`phoneInput bg-none border-0 w-100 pe-0`}
            buttonClass="bg-none border-0 phoneLabel rounded-start-3"
            // dropdownClass="bg-none border-0 rounded-3"
            dropdownClass="rounded-3"
            containerClass={`bg-none border-0 d-flex align-items-center col-3 px-0 ${props.pinContainerClass && props.pinContainerClass ||""}`}
            placeholder={placeholderCode || " "}
            specialLabel=" "
            inputProps={{
              name: "phoneCode",
              required: true,
              // autoFocus: true,
              id: labelCode && labelCode.replaceAll(/[^a-zA-Z0-9]/g, "_"),
            }}
            defaultErrorMessage="Please Enter The Correct Phone Number"
            onChange={handleChange}
          />
          <FormGroup
            preventSpaces
            numOnly
            conClassName="border-start rounded-0 col-9 p-0"
            inputClassName={`border-0 ${props.inputClass && props.inputClass ||""}`}
            // label={label}
            // name={label && label.replaceAll(/[^a-zA-Z0-9]/g, "_")}
            // placeholder=""
            {...props}

          />
        </div>
      </div>
    </>
  );
};

export default PhoneInputWrapper;
