import React, { useContext } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { deleteBasketDevice, updateBasketDevice } from "../http/basketAPI";

const BasketDeviceItem = observer(({ device, brand, type }) => {
  const { user, basket } = useContext(Context);

  const removeFromCart = async () => {
    basket.setTotalCount(null, basket.devices.entities[device.id].count);
    basket.removeDevice(device.id);
    if (user.loggedIn) {
      await deleteBasketDevice(basket.basket, device.id)
        .then((data) => console.log(data.message))
        .catch((e) => console.log(e));
    }
  };

  const changeCountDevice = async (id, bool) => {
    if (bool) {
      basket.changeCountDevice(id, bool);

      if (user.loggedIn) {
        await updateBasketDevice(basket.basket, id, {
          name: "count",
          action: "up",
        })
          .then((data) => console.log(data.message))
          .catch((e) => console.log(e));
      }
    } else {
      basket.changeCountDevice(id, bool);

      if (user.loggedIn && basket.devices.entities[id].count > 1) {
        await updateBasketDevice(basket.basket, id, {
          name: "count",
          action: "down",
        })
          .then((data) => console.log(data.message))
          .catch((e) => console.log(e));
      }
    }
  };

  return (
    <Card
      className="basket-devices__basket-device basket-device"
      style={{
        width: "16rem",
      }}
    >
      <Image
        width={150}
        height={150}
        className="mx-auto mt-3"
        src={process.env.REACT_APP_API_URL + "/" + device.img}
        alt="Device Image"
      />
      <Card.Body className="basket-device__body">
        <Card.Title>{brand}</Card.Title>
        <Card.Text>{device.name}</Card.Text>
        <div className="mt-1 d-flex align-items-center justify-content-between">
          <div className="me-1">Категория:</div>
          <div className="ms-2">{type}</div>
        </div>
        <div className="mt-3 d-flex justify-content-between align-items-center">
          <div className="me-2">Количество:</div>
          <div className="d-flex align-items-center ms-2">
            <div
              className="d-inline-block me-2"
              style={{
                width: "40px",
                height: "40px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: "50%",
                textAlign: "center",
                cursor: "pointer",
                opacity: `${
                  basket.devices.entities[device.id].count === 1 ? "0.3" : "1"
                }`,
              }}
              onClick={() => changeCountDevice(device.id, false)}
              title="Уменьшить"
            >
              -
            </div>
            <div className="d-inline-block">
              {basket.devices.entities[device.id].count}
            </div>
            <div
              className="d-inline-block ms-2"
              style={{
                width: "40px",
                height: "40px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "black",
                borderRadius: "50%",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => changeCountDevice(device.id, true)}
              title="Увеличить"
            >
              +
            </div>
          </div>
        </div>
        <div className="mt-2 d-flex align-items-center justify-content-between">
          <div className="me-2">Стоимость:</div>
          <div className="ms-2">{`${
            Number(device.price) * basket.devices.entities[device.id].count
          } руб.`}</div>
        </div>
      </Card.Body>
      <div className="mb-4 d-flex justify-content-center">
        <Button variant="outline-danger" onClick={removeFromCart}>
          Удалить из корзины
        </Button>
      </div>
    </Card>
  );
});

export default BasketDeviceItem;
