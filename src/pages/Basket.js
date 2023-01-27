import React, { useCallback, useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Context } from "..";
import BasketDeviceItem from "../components/BasketDeviceItem";
import Total from "../components/Total";
import { observer } from "mobx-react-lite";
import UniversalModal from "../components/modals/UniversalModal";
import RemoteBasketDevicesList from "../components/RemoteBasketDevicesList";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, ORDER_ROUTE } from "../utils/consts";
import { createOrder } from "../http/orderAPI";
import { createPendingPurchase } from "../http/pendingPurchaseAPI";
import { deleteBasketDevice } from "../http/basketAPI";

const Basket = observer(() => {
  const { user, devices, basket, orders } = useContext(Context);
  const history = useNavigate();

  const [showUniversalModal, setShowUniversalModal] = useState(false);
  const messageForUniversalModal =
    "Чтобы оформить заказ, пожалуйста пройдите авторизацию!";

  const getBrandType = useCallback((condition, i, devicesRemoved = false) => {
    let value;

    if (devicesRemoved) {
      if (condition === "brand") {
        const brandId = basket.remoteDevices.entities[i].brandId;
        value = devices.brands.find((item) => item.id === brandId);
      } else if (condition === "type") {
        const typeId = basket.remoteDevices.entities[i].typeId;
        value = devices.types.find((item) => item.id === typeId);
      }
    } else {
      if (condition === "brand") {
        const brandId = basket.devices.entities[i].brandId;
        value = devices.brands.find((item) => item.id === brandId);
      } else if (condition === "type") {
        const typeId = basket.devices.entities[i].typeId;
        value = devices.types.find((item) => item.id === typeId);
      }
    }

    return value.name;
  });

  const checkout = async () => {
    if (user.loggedIn) {
      await createOrder(user.user.id, basket.basket)
        .then((data) => {
          orders.setOrder(data.order, data.orderRecords);
          console.log(data.message);
        })
        .catch((e) => console.log(e));

      for (let id of basket.devices.ids) {
        await deleteBasketDevice(basket.basket, id)
          .then((data) => console.log(data.message))
          .catch((e) => console.log(e));
      }

      basket.setDevices({ ids: [], entities: {} });

      if (basket.remoteDevices.ids.length) {
        const deviceIds = JSON.stringify(basket.remoteDevices.ids);
        await createPendingPurchase(user.user.id, deviceIds)
          .then((data) => {
            basket.setRemoteDevices({ ids: [], entities: {} });
            console.log(data.message);
          })
          .catch((e) => console.log(e));
      }

      basket.setTotalCount(0);

      history(ORDER_ROUTE);
    } else {
      setShowUniversalModal(true);
    }
  };

  return (
    <Container>
      <RemoteBasketDevicesList getBrandType={getBrandType} />

      {basket.devices.ids.length === 0 ? (
        <>
          <h4 className="mt-2">Корзина пуста. Очень жаль!</h4>
          <p>
            Для того, чтобы посмотреть список своих заказов -{" "}
            <Link to={user.loggedIn ? ORDER_ROUTE : LOGIN_ROUTE}>
              {user.loggedIn ? "посмотреть мои заказы." : "авторизуйтесь."}
            </Link>
          </p>
        </>
      ) : (
        <>
          <Row className="d-flex justify-content-between ">
            {basket.devices.ids.map((i) => (
              <BasketDeviceItem
                key={i}
                device={basket.devices.entities[i]}
                brand={getBrandType("brand", i)}
                type={getBrandType("type", i)}
              />
            ))}
          </Row>
          <Row className="mt-4">
            <Total getBrandType={getBrandType} checkout={checkout} />
          </Row>
          <UniversalModal
            show={showUniversalModal}
            onHide={() => setShowUniversalModal(false)}
            message={messageForUniversalModal}
          />
        </>
      )}
    </Container>
  );
});

export default Basket;
