import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteBrand } from "../../http/deviceAPI";

const DeleteBrandModal = ({
  show,
  onHide = (f) => f,
  showModalWindowExecution = (f) => f,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const destroyBrand = () => {
    deleteBrand(id, name)
      .then((data) => {
        setId("");
        setName("");
        if (data.brand === 1) {
          showModalWindowExecution(true);
        } else if (data.brand === 0) {
          showModalWindowExecution(false);
        }
      })
      .catch((e) => console.log(e.response.data.message));
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить брэнд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите id брэнда"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Введите название брэнда"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={destroyBrand}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBrandModal;
