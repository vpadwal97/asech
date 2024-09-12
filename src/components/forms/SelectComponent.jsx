// SelectComponent.js
import React from 'react';
import IoIosInformationCircleCustom from './IoIosInformationCircleCustom';

const SelectComponent = ({ label,selectedOption, placeholder, onChange, dropdownlist, disabled,required,value,tooltipMessage }) => {


    return (
        <div className="select_shadow form-floating">
            <select
                className="ui dropdown form-select input-shadow py-0"
                id={label && label.replaceAll(" ", "_")}
                onChange={onChange}
                value={value}
                disabled={disabled}>
                <option value="">--Please Select--</option>
                {dropdownlist?.map((option) => (
                    selectedOption?(
                        <option selected={selectedOption===option.optionValue} key={option.optionValue} value={option.optionValue}>
                        {option.optionLabel}
                        </option>
                    ):
                    (
                        <option selected={option.optionSelected} key={option.optionValue} value={option.optionValue}>
                        {option.optionLabel}
                        </option>
                    )
                    
                ))}

            </select>
            <label htmlFor={label && label.replaceAll(" ", "_")}>
                {placeholder}{label}
                <span className={required}></span>
                <IoIosInformationCircleCustom tooltipMessage={tooltipMessage}/>
            </label>
        </div>
    );
}

export default SelectComponent;
