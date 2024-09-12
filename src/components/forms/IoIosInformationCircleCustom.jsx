import React from 'react';
import { IoIosInformationCircle } from "react-icons/io";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const IoIosInformationCircleCustom = ({ ...props }) => {


  return (
    <>
      <OverlayTrigger className={` ${props.overlayTriggerClass}`} overlay={<Tooltip className={` ${props.tooltipClass}`}>{props.tooltipMessage}</Tooltip>}>
        <span className="d-block ms-1">
          <IoIosInformationCircle className={`font-18 ${props.iconCLass}`}/>
        </span>
      </OverlayTrigger>
    </>
  );
};

export default IoIosInformationCircleCustom;
