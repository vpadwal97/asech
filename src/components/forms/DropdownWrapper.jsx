import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { FaAngleDown } from "react-icons/fa";

const DropdownWrapper = forwardRef((props, ref) => {
  const [toggleDropdown, setToggleDropdown] = useState();
  const [downUp, setDownUp] = useState("up");
  const wrapperRef = useRef(null);

  // Expose this function to parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    triggerFunction: () => {
      setToggleDropdown(false);
    },
  }));

  const handleCloseDD = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setToggleDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleCloseDD);
    return () => {
      document.removeEventListener("mousedown", handleCloseDD);
    };
  }, []);

  const handleToggleDropdown = () => {
    setToggleDropdown(!toggleDropdown);
  };
  return (
    <div
      className={`dropdownWrapper dropdowns position-relative ${
        props.ddConClass || ""
      } ${(props.fullscreenDropdown && "fullscreenDropdown") || ""}`}
      ref={wrapperRef}
    >
      <button
        className={`dropdownToggle border w-100 btn z-3 ${downUp} ${
          props.buttonClass || ""
        } ${toggleDropdown ? " active " : ""}`}
        onClick={handleToggleDropdown}
        onMouseDown={() => setDownUp("down")}
        onMouseUp={() => setDownUp("up")}
        onMouseLeave={() => setDownUp("up")}
      >
        <div className="d-flex align-items-center justify-content-between">
          <span className="text-center w-100">{props.buttonlabel}</span>
          <div className="ms-1 lh-1">
            <FaAngleDown size={16} className="ddIcon" />
          </div>
        </div>
      </button>
      <div
        className={`dropdownMenu position-absolute z-1 w-100 mt-1 ${
          toggleDropdown ? " show " : ""
        } ${props.dropdownMenuClass || ""}`}
      >
        <div
          className={`dropdownMenuCon rounded-3 bs-body-bg border p-3 h-100 ${
            props.dropdownMenuCon || ""
          } ${toggleDropdown ? " show " : ""}`}
        >
          {props.fullscreenDropdown && (
            <>
              <button
                className="btn btn-close position-absolute top-0 end-0"
                onClick={handleToggleDropdown}
              ></button>
            </>
          )}
          {props.dropdownMenu}
        </div>
      </div>
    </div>
  );
});

export default DropdownWrapper;
