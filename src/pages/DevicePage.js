import React, { useEffect, useState, useContext } from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import BasicData from "../components/device_page_components/BasicData";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { addBasketDevice } from "../http/basketAPI";

const DevicePage = observer(() => {
  const { user, devices, basket } = useContext(Context);

  const [addDevice, setAddDevice] = useState(false);

  const addToShoppingCart = async () => {
    if (addDevice) {
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
    <div className="page__device-page device-page">
      <Container className="device-page__container">
        <div className="device-page__main main-device-page">
          <div className="device-page__main_image">
            <Image
              className="image-device-page"
              src={
                process.env.REACT_APP_API_URL + "/" + devices.selectedDevice.img
              }
              alt="Device"
            />
          </div>
          <div className="device-page__main_data data-device-page">
            <BasicData />
            <div className="data-device-page__basket-panel">
              <div className="data-device-page__basket-panel_prices basket-panel__prices">
                <div className="basket-panel__prices_small">
                  {devices.selectedDevice.price}&#8381;
                </div>
                <div className="basket-panel__prices_big">
                  {(devices.selectedDevice.price * 1.35).toFixed(0)}&#8381;
                </div>
                <div className="basket-panel__prices_discount">
                  -
                  {
                    ~~(
                      (devices.selectedDevice.price * 100) /
                      (~~devices.selectedDevice.price * 1.35)
                    )
                  }
                  %
                </div>
              </div>
              <a
                className="data-device-page__basket-panel_link"
                href="https://ru.wikipedia.org/wiki/%D0%A1%D0%BA%D0%B8%D0%B4%D0%BA%D0%B0"
                target="_blank"
                rel="noreferrer"
              >
                Узнайте больше о скидках
              </a>
              <Button
                className="data-device-page__basket-panel_button"
                variant="info"
                onClick={() => setAddDevice(true)}
              >
                Добавить в корзину
              </Button>
              <div className="data-device-page__basket-panel_delivery">
                Доставка <span>завтра</span>
              </div>
            </div>
          </div>
        </div>
        <div className="device-page__description">
          <h2 className="device-page__description_title">Описание</h2>
          <p className="device-page__description_text">
            {devices.selectedDevice.description}
          </p>
        </div>
        <div className="device-page__records m-3">
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
        </div>
      </Container>
    </div>
  );
});

export default DevicePage;
