import React, { useCallback, useContext, useState, useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import Image from "react-bootstrap/Image";
import star from "../../assets/yellow-star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../../utils/consts";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { addBasketDevice } from "../../http/basketAPI";

const DeviceItem = observer(({ device, brand, addItemToCart = (f) => f }) => {
  const { devices, basket, user } = useContext(Context);
  const history = useNavigate();

  const selectDevice = useCallback(() => {
    devices.setSelectedDevice(device.id);
    history(DEVICE_ROUTE + "/" + device.id);
  }, [devices, history]);

  const [addDevice, setAddDevice] = useState(false);

  const addToShoppingCart = async () => {
    if (addDevice) {
      if (!basket.devices.entities[device.id]) {
        basket.setDevice(device);
        if (user.loggedIn) {
          await addBasketDevice(
            basket.basket,
            device.id,
            basket.devices.entities[device.id].price
          )
            .then((data) => console.log(data.message))
            .catch((e) => console.log(e));
        }
      }

      if (basket.remoteDevices.entities[device.id]) {
        basket.removeDeviceFromRemoteDevices(device.id);
      }

      setAddDevice(false);
    }
  };

  useEffect(() => {
    addToShoppingCart();
  }, [addDevice]);

  return (
    <div className="device-list__device-item device-item">
      <Card
        title={`Для того, чтобы посмотреть дополнительную 
информацию о товаре - нажмите на карточку`}
        className="device-item__card-device-item card-device-item"
        onClick={() => selectDevice()}
      >
        <Image
          className="device-item__card-device-item_image"
          src={process.env.REACT_APP_API_URL + "/" + device.img}
          alt="Device Image"
        />
        <div className="card-device-item__brand-rating brand-rating">
          <div className="card-device-item__brand-rating_brand">{brand}</div>
          <div className="brand-rating__rating">
            <div className="brand-rating__rating_count">{device.rating}</div>
            <Image
              className="brand-rating__rating_image"
              src={star}
              alt="Star"
            />
          </div>
        </div>
        <div className="card-device-item__name">{device.name}</div>
        <div className="card-device-item__price">Цена: {device.price} руб.</div>
        <Button
          className="card-device-item__button"
          variant="info"
          onClick={(e) => {
            e.stopPropagation();
            setAddDevice(true);
            addItemToCart();
          }}
        >
          В корзину
        </Button>
      </Card>
    </div>
  );
});

export default DeviceItem;
