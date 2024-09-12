import React, { useState } from "react";
import FlagIcon from "../../assets/noIMGSq.png";
import IoIosInformationCircleCustom from "./IoIosInformationCircleCustom";
import ErrorIcon from "./ErrorIcon";
import { FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import TooltipMessage from "./TooltipMessage";


const LogoIcons = ({ ...props }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    props.onChange(event);
  };
  const handleRemoveClick = (event) => {
    console.log('reomveing');
    event.preventDefault();
    setSelectedFile(null);
    if (props.onRemove) {
      props.onRemove();
    }
  };

  return (
    <div
      className={`LogoLabel form-group position-relative ${
        props.errorMessage ? " highlight-error " : ""
      }`}
    >
      <div
    //   className="form-control" 
      className={`p-2 form-control ${
        props.errorMessage ? "" : "border border-transparent"
      }`}
      >
        <label className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            {props.title}

            {props.tooltipMessage && (
              <IoIosInformationCircleCustom
                tooltipMessage={props.tooltipMessage}
              />
            )}
          </div>
          {props.errorMessage && (
            <span className="tooltipErrorMessage top-50 translate-middle-y text-danger">
              <ErrorIcon errorMessage={props.errorMessage} />
            </span>
          )}
        </label>
        <div 
        className={`img-con image d-flex justify-content-center p-1 ${props.imgConClass}`}
        // className="image d-flex justify-content-center p-3" 
        >
          <img
            className={`imgpreview w-100 ${props.imgClass}`}
            src={selectedFile ? URL.createObjectURL(selectedFile) : props.value}
            alt="Preview"
            onError={(e) => {
              e.target.src = FlagIcon;
            }}
          />

{/* <div className="position-absolute d-flex start-50 top-50 translate-middle btn-con"> */}
{props.disabled ? "" : 
<div className={`position-absolute start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center btn-con`}>
          <div className="pe-1">
            <label
              htmlFor={props.fileInputId}
              className="custom-file-btn btn text-white font-18 btn-sm p-1 lh-1"
            >
              <TooltipMessage tooltipMessage="Add / Edit">
                <FaEdit />
              </TooltipMessage>
              <input
                id={props.fileInputId}
                type="file"
                className="d-none"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="ps-1">
            <button
              className="custom-file-btn btn text-white font-18 btn-sm p-1 lh-1"
              onClick={handleRemoveClick}
            >
              <TooltipMessage tooltipMessage="Remove">
                <ImBin  />
              </TooltipMessage>
            </button>
          </div>
        </div>
}



        </div>

        {/* <div className="row mx-0 g-2">
          <div className="col-lg-6">
            <label
              htmlFor={props.fileInputId}
              className="custom-file-btn btn btn-primary w-100 btn btn-sm"
            >
              Upload
              <input
                id={props.fileInputId}
                type="file"
                className="d-none"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="col-lg-6">
            <button
              className="custom-file-btn btn btn-primary w-100 btn btn-sm"
              onClick={handleRemoveClick}
            >
              Remove
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LogoIcons;
