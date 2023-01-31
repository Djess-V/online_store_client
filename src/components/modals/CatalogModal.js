import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { isEmpty } from "../../utils/servicesFunction";

const CatalogModal = ({
  field,
  data,
  show,
  onHide = (f) => f,
  selected,
  highlightListItem = (f) => f,
}) => {
  return (
    <Modal
      className="shop__catalog-modal catalog-modal"
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Выберите {field === "types" ? "тип" : "бренд"} устройства.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup className="catalog-modal__list" variant="flush">
          <ListGroup.Item
            active={isEmpty(selected)}
            onClick={() => highlightListItem({}, field)}
            variant="outline-success"
          >
            Все {field === "types" ? "типы" : "бренды"}
          </ListGroup.Item>
          {data.map((item) => (
            <ListGroup.Item
              key={item.id}
              active={item.id === selected.id}
              onClick={() => highlightListItem(item, field)}
            >
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CatalogModal;
