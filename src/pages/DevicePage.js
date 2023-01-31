import React, { useEffect, useState, useContext } from "react";
import { Container, Col, Image, Row, Card, Button } from "react-bootstrap";
import AddDeviceAlert from "../components/alerts/AddDeviceAlert";
import star from "../assets/Star_for_DevicePage.png";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { addBasketDevice } from "../http/basketAPI";

const DevicePage = observer(() => {
  const { user, devices, basket } = useContext(Context);

  const [addDevice, setAddDevice] = useState(false);
  const [showAddDeviceAlert, setShowAddDeviceAlert] = useState(false);

  const addToShoppingCart = async () => {
    if (addDevice) {
      if (!showAddDeviceAlert) {
        setShowAddDeviceAlert(true);
        setTimeout(() => setShowAddDeviceAlert(false), 2000);
      }

      if (!basket.devices.entities[devices.selectedDevice.id]) {
        basket.setDevice(devices.selectedDevice);
        if (user.loggedIn) {
          await addBasketDevice(
            basket.basket,
            devices.selectedDevice.id,
            basket.devices.entities[devices.selectedDevice.id].price
          )
            .then((data) => console.log(data.message))
            .catch((e) => console.log(e));
        }
      }

      if (basket.remoteDevices.entities[devices.selectedDevice.id]) {
        basket.removeDeviceFromRemoteDevices(devices.selectedDevice.id);
      }

      setAddDevice(false);
    }
  };

  useEffect(() => {
    addToShoppingCart();
  }, [addDevice]);

  return (
    <div className="device-page_block">
      <Container className="mt-3 d-flex flex-column">
        <AddDeviceAlert show={showAddDeviceAlert} />
        <Row
          className="d-flex justify-content-between align-items-center"
          style={{ width: "100%" }}
        >
          <Col md={4}>
            <Image
              width={300}
              height={300}
              src={
                process.env.REACT_APP_API_URL + "/" + devices.selectedDevice.img
              }
            />
          </Col>
          <Col md={4}>
            <Row>
              <Row className="d-flex justify-content-center align-items-center">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                  {devices.selectedDevice.name}
                </h2>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    background: `url(${star}) no-repeat center center`,
                    width: 240,
                    height: 240,
                    backgroundSize: "cover",
                    fontWeight: 600,
                    fontSize: 64,
                  }}
                >
                  {devices.selectedDevice.rating}
                </div>
              </Row>
            </Row>
          </Col>
          <Col md={4} className="d-flex justify-content-end">
            <Card
              className="d-flex flex-column justify-content-around align-items-center"
              style={{
                width: 300,
                height: 300,
                fontSize: 32,
                border: "5px solid green",
              }}
            >
              <h3>От: {devices.selectedDevice.price} руб.</h3>
              <Button
                variant={"outline-success"}
                onClick={() => setAddDevice(true)}
              >
                Добавить в корзину
              </Button>
            </Card>
          </Col>
        </Row>
        <Row className="m-3">
          <h2 className="m-2">Характеристики</h2>
          {devices.selectedDevice.info.map((info, index) => (
            <Row
              key={info.id}
              className="m-1 ms-4"
              style={{
                backgroundColor: `${
                  index % 2 === 0 ? "lightgreen" : "transparent"
                }`,
              }}
            >
              {" "}
              {info.title}: {info.description}
            </Row>
          ))}
        </Row>
      </Container>
    </div>
  );
});

export default DevicePage;
