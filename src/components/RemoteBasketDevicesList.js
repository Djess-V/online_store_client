import React, { useContext } from "react";
import { Card, Button, Image } from "react-bootstrap";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { addBasketDevice } from "../http/basketAPI";

const RemoteBasketDevicesList = observer(({ getBrandType = (f) => f }) => {
  const { user, basket } = useContext(Context);

  const restoreRecord = async (id) => {
    if (user.loggedIn) {
      await addBasketDevice(
        basket.basket,
        id,
        basket.remoteDevices.entities[id].price
      )
        .then((data) => console.log(data.message))
        .catch((e) => console.log(e));
    }

    basket.reestablishDevice(id);
  };

  return (
    <>
      {basket.remoteDevices.ids.length > 0 && (
        <Card className="basket__remote-devices remote-devices mt-3">
          <Card.Body>
            <Card.Title className="remote-devices__title">
              Удалённые устройства
            </Card.Title>
            <hr />
            <ul className="remote-devices__list-remote-devices list-remote-devices">
              {basket.remoteDevices.ids.map((id) => (
                <li
                  key={id}
                  className="list-remote-devices__remote-device remote-device my-4 d-flex align-items-center justify-content-between"
                >
                  <div className="remote-device__image-name d-flex align-items-center">
                    <Image
                      className="remote-device__image-name_image"
                      src={
                        process.env.REACT_APP_API_URL +
                        "/" +
                        basket.remoteDevices.entities[id].img
                      }
                      alt="Device Image"
                    />
                    <div className="remote-device__image-name_name">{`${getBrandType(
                      "brand",
                      id,
                      true
                    )} ${basket.remoteDevices.entities[id].name}`}</div>
                  </div>
                  <Button
                    className="remote-device__button"
                    variant="outline-success"
                    onClick={() => restoreRecord(id)}
                  >
                    Восстановить
                  </Button>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </>
  );
});

export default RemoteBasketDevicesList;
