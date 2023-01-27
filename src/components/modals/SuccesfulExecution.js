import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccesfulExecution = ({ show, onHide = (f) => f }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Успешное выполнение</Modal.Title>
      </Modal.Header>
      <Modal.Body>Операция выполнена успешно!</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccesfulExecution;
