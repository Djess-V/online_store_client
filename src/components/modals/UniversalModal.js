import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";

const UniversalModal = ({ show, onHide = (f) => f, message }) => {
  const history = useNavigate();

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Подтвердите действие на странице
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {message ===
          "Чтобы оформить заказ, пожалуйста пройдите авторизацию!" && (
          <Button
            variant="outline-success"
            onClick={() => history(LOGIN_ROUTE)}
          >
            Войти
          </Button>
        )}
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UniversalModal;
