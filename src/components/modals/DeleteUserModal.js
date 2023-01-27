import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteUser } from "../../http/userAPI";

const DeleteUserModal = ({
  show,
  onHide = (f) => f,
  showModalWindowExecution = (f) => f,
}) => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const destroyUser = () => {
    deleteUser(id, email)
      .then((data) => {
        setId("");
        setEmail("");
        if (data.user === 1) {
          showModalWindowExecution(true);
        } else if (data.user === 0) {
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
          Удалить пользователя
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            placeholder="Введите id пользователя"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Form.Control
            className="mt-2"
            placeholder="Введите email пользователя"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={destroyUser}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
