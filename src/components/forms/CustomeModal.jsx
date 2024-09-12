import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomeModal({ show, handleClose,modalBody,size,fullscreen,modalName,btnClose }) {

  // const [showModal, setShowModal] = useState(false);

  // const handleOpenModal = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    size={size}
    fullscreen={fullscreen}
    className={modalName}
    >
      {/* <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        {btnClose && 
      <div className='text-end btn-close-con'>
      <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
      </div>}
      {modalBody}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default CustomeModal;
