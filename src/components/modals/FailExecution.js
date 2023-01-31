import React from "react";
import { Modal, Button } from "react-bootstrap";

const FailExecution = ({ show, onHide = (f) => f }) => {
  return (
    <Modal className="admin-fail-execution__modal" show={show} onHide={onHide}>
      <Modal.Header className="admin-fail-execution__modal_header" closeButton>
        <Modal.Title>Неудача</Modal.Title>
      </Modal.Header>
      <Modal.Body className="admin-fail-execution__modal_body">
        Данные не найдены
      </Modal.Body>
      <Modal.Footer className="admin-fail-execution__modal_footer">
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FailExecution;
