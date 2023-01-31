import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccesfulExecution = ({ show, onHide = (f) => f }) => {
  return (
    <Modal
      className="admin-success-execution__modal"
      show={show}
      onHide={onHide}
    >
      <Modal.Header
        className="admin-success-execution__modal_header"
        closeButton
      >
        <Modal.Title>Выполнено</Modal.Title>
      </Modal.Header>
      <Modal.Body className="admin-success-execution__modal_body">
        Операция выполнена!
      </Modal.Body>
      <Modal.Footer className="admin-success-execution__modal_footer">
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccesfulExecution;
