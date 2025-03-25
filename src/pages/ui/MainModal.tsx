//const mainModel that will be used to open and close the modal

import React, { useContext, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { MainModalProps } from "../../types/layout";

const MainModal: React.FC<MainModalProps> = ({
  isOpen,
  message,
  error,
  show,
  close,
}) => {
  return (
    <Modal show={isOpen} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{error ? "Error" : "Notification"}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center m-3">
        <p className="mb-0">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MainModal;
