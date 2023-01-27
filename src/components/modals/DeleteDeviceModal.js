import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteDevice } from "../../http/deviceAPI";

const DeleteDeviceModal = ({
  show,
  onHide = (f) => f,
  showModalWindowExecution = (f) => f,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const destroyDevice = () => {
    deleteDevice(id, name)
      .then((data) => {
        setId("");
        setName("");
        if (data.device === 1) {
          showModalWindowExecution(true);
        } else if (data.type === 0) {
          showModalWindowExecution(false);
        }
      })
      .catch((e) => {
        showModalWindowExecution(false);
        console.log(e.response.data.message);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите id устройства"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Введите название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={destroyDevice}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteDeviceModal;
