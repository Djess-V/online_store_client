import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteType } from "../../http/deviceAPI";

const DeleteTypeModal = ({
  show,
  onHide = (f) => f,
  showModalWindowExecution = (f) => f,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const destroyType = () => {
    deleteType(id, name)
      .then((data) => {
        setId("");
        setName("");
        if (data.type === 1) {
          showModalWindowExecution(true);
        } else if (data.type === 0) {
          showModalWindowExecution(false);
        }
      })
      .catch((e) => console.log(e.response.data.message));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите id типа"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Введите название типа"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={destroyType}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteTypeModal;
