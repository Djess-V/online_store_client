import React, { useContext, useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchTypes, fetchBrands, createDevice } from "../../http/deviceAPI";

const CreateDevice = observer(({ show, onHide = (f) => f }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [desc, setDesc] = useState(null);
  const [descName, setDescName] = useState("");
  const [info, setInfo] = useState([]);

  const imageRef = useRef();
  const descRef = useRef();

  const { devices } = useContext(Context);

  const selectedFile = (e, condition) => {
    const file = e.target.files[0];

    if (condition === "image") {
      if (file === undefined) {
        if (fileName) {
          setFileName("");
        }
        return;
      }
      if (file.type !== "image/webp" && file.type !== "image/jpeg") {
        setFileName("Выберите правильный формат файла!");
        setTimeout(() => setFileName(""), 2000);
        return;
      }
      setFile(file);
      setFileName(file.name);
    } else if (condition === "desc") {
      if (file === undefined) {
        if (descName) {
          setDescName("");
        }
        return;
      }
      if (file.type !== "text/plain") {
        setDescName("Выберите правильный формат файла!");
        setTimeout(() => setDescName(""), 2000);
        return;
      }
      setDesc(file);
      setDescName(file.name);
    }
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("description", desc);
    formData.append("brandId", selectedBrand.id);
    formData.append("typeId", selectedType.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => {
      onHide();
      setSelectedType("");
      setSelectedBrand("");
    });
  };

  useEffect(() => {
    fetchTypes().then((data) => devices.setTypes(data));
    fetchBrands().then((data) => devices.setBrands(data));
  }, []);

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle className="mt-2 mb-2">
              {selectedType.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {devices.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle className="mt-2 mb-2">
              {selectedBrand.name || "Выберите брэнд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {devices.brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Стоимость устройства"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Button className="mt-3" onClick={() => imageRef.current.click()}>
            Выберите изображение (*.webp, *.jpg)
          </Button>
          <div className="mt-1">{fileName}</div>
          <Form.Control
            className="mt-3"
            type="file"
            ref={imageRef}
            style={{ display: "none" }}
            placeholder="Изображение"
            onChange={(e) => selectedFile(e, "image")}
          />
          <Button className="mt-1" onClick={() => descRef.current.click()}>
            Выберите файл описания (*.txt)
          </Button>
          <div className="mt-1">{descName}</div>
          <Form.Control
            className="mt-3"
            type="file"
            ref={descRef}
            style={{ display: "none" }}
            placeholder="Описание"
            onChange={(e) => selectedFile(e, "desc")}
          />
          <hr />
          <Button className="mt-3" variant="outline-dark" onClick={addInfo}>
            Добавить свойство
          </Button>
          {info.map((i) => (
            <Row key={i.number} className="mt-3">
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Название"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Описание"
                />
              </Col>
              <Col md={4} className="d-flex justify-content-center">
                <Button
                  variant="outline-danger"
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onHide()}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
