import React, { useState } from 'react';

const CreateProductDropDown = ({ productSchemaCreate, handleChangeCreate }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="custom-dropdown">
      <button
        className="custom-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Create
      </button>
      {showDropdown && (
        <div className="dropdown-content">
          {productSchemaCreate.map((item) => (
            <a
              className="custom-dropdown-item"
              onClick={() => {
                handleChangeCreate(item);
                setShowDropdown(false);
              }}
              key={item.value}
            >
              {item.optionLabel}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};





export default CreateProductDropDown