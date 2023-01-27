import React from "react";
import { Modal, Button } from "react-bootstrap";

const FailExecution = ({ show, onHide = (f) => f }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Неудача</Modal.Title>
      </Modal.Header>
      <Modal.Body>Данные не найдены</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FailExecution;
