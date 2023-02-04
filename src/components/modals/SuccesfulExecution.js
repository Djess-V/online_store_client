import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccesfulExecution = ({
  show,
  onHide = (f) => f,
  message = undefined,
}) => {
  return (
    <Modal
      className="admin-success-execution__modal"
      show={show}
      onHide={onHide}
    >
      {!message && (
        <Modal.Header
          className="admin-success-execution__modal_header"
          closeButton
        >
          <Modal.Title>Выполнено</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body className="admin-success-execution__modal_body">
        {message ? message : "Операция выполнена!"}
      </Modal.Body>
      {!message && (
        <Modal.Footer className="admin-success-execution__modal_footer">
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default SuccesfulExecution;
