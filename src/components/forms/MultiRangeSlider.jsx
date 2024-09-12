import React, { useEffect, useState } from "react";
import ReactSlider from "react-slider";

const MultiRangeSlider = ({
  mine,
  maxe,
  gape,
  entitye,
  onValueChange,
  initialValue,
  unit,
}) => {
  const [values, setValues] = useState([mine, maxe]);

  const handleInputChange = (newValues) => {
    setValues(newValues);
    onValueChange(newValues);
  };

  return (
    <div className="multi-range-slider">
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        defaultValue={values}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        pearling
        min={mine}
        max={maxe}
        minDistance={gape}
        onChange={(newValues) => handleInputChange(newValues)}
        initialValue={initialValue}
        unit={unit}
      />
    </div>
  );
};

export default MultiRangeSlider;
