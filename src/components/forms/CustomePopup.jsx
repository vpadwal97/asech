import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { FaRegCircleCheck  } from "react-icons/fa6";
import { RiInformationLine } from "react-icons/ri";
import { PiWarningCircleBold } from "react-icons/pi";
import { FaRegQuestionCircle } from "react-icons/fa";


function CustomePopup({ icons, titles, texts, url , showCommand , onValueChange , size, btnClose , customebtnClick}) {
  const navigate = useNavigate();

  const [show, setShow] = useState(showCommand);

  const handleClose = () => {
    // if(customebtnClick){
      customebtnClick();
    // }
    setShow(false);
    onValueChange(false);

    if(url){
      const timer = setTimeout(() => {
        navigate(url)
      }, 300);
    }
  };
  // const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showCommand)
    // Swal.fire({
    //   icon: icons,
    //   title: titles,
    //   text: texts,
    //   confirmbuttonText: 'OK',
    //   customClass: {
    //     confirmbutton: 'submit-btn btn btn-sm btn-primary px-4 py-2 border-0'
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     // Handle navigation here
    //     if(url != '' || url != undefined){
    //       navigate(url);
    //     }
    //   }
    // });
  }, [icons, titles, texts, url, showCommand]);


  return<>
  
  {/* <button variant="primary" onClick={handleShow}>
    Launch static backdrop modal
  </button> */}

  <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    centered
    size={size}
    fullscreen="true"
  >
    {/* <Modal.Header closebutton>
      <Modal.Title className='w-100'>
        <div className="d-flex w-100 justify-content">
        <span dangerouslySetInnerHTML={{ __html: titles }} />
        <button className="submit-btn btn btn-sm btn-primary px-2 py-1 border-0 m-0" onClick={handleClose}>
        X
      </button>
        </div>
      </Modal.Title>
    </Modal.Header> */}
    <Modal.Body>


    {/* <h2>Child Component</h2>
            <input type="text" value={inputValue} onChange={handleChange} />
            <button onClick={handleClick}>Send Value to Parent</button> */}

{btnClose && <div className="d-flex w-100 justify-content">
        {/* <span dangerouslySetInnerHTML={{ __html: titles }} /> */}
        <button className="submit-btn btn btn-sm btn-primary px-2 py-1 border-0 m-0 ms-auto" onClick={handleClose}>
        X
      </button>
        </div>}

    <div className='d-flex flex-column align-items-center justify-content-center icom-pops' 
    // style={{minWidth: "350px" , minHeight: "200px" , maxWidth: "100%" , maxHeight: "100%" }}
    >
    {icons && icons === "success" ? <FaRegCircleCheck  className={`${icons} modal-icons my-2`} /> : ""} 
    {icons && icons === "error" ? <IoMdCloseCircleOutline className={`${icons} modal-icons my-2`} /> : ""} 
    {icons && icons === "warning" ? <PiWarningCircleBold className={`${icons} modal-icons my-2`} /> : ""} 
    {icons && icons === "info" ? <RiInformationLine className={`${icons} modal-icons my-2`} /> : ""} 
    {icons && icons === "question" ? <FaRegQuestionCircle className={`${icons} modal-icons my-2`} /> : ""} 
    {titles && <div className='my-2 CustomePopup-titles text-secondary text-center'>{titles}</div>}
     {texts && <div className='my-2 CustomePopup-texts text-secondary'>
      {texts}
      {/* <div dangerouslySetInnerHTML={{ __html: texts }} /> */}
      </div>}
      <button className="btn btn-primary px-5 py-1 border-0 my-2  font-14 rounded-tr-bl string-limit" onClick={handleClose}>
        OK
      </button>
    </div>
    </Modal.Body>
    {/* <Modal.Footer>
      <button variant="primary">Understood</button>
    </Modal.Footer> */}
  </Modal>
</>;
}

export default CustomePopup;