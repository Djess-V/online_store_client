import React, { useCallback, useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Context } from "..";
import BasketDeviceItem from "../components/basket_components/BasketDeviceItem";
import Total from "../components/basket_components/Total";
import { observer } from "mobx-react-lite";
import UniversalModal from "../components/modals/UniversalModal";
import RemoteBasketDevicesList from "../components/basket_components/RemoteBasketDevicesList";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, ORDER_ROUTE } from "../utils/consts";
import { createOrder } from "../http/orderAPI";
import { createPendingPurchase } from "../http/pendingPurchaseAPI";
import { deleteBasketDevice } from "../http/basketAPI";
import SuccesfulExecution from "../components/modals/SuccesfulExecution";

const Basket = observer(() => {
  const { user, devices, basket, orders } = useContext(Context);
  const history = useNavigate();

  const [showUniversalModal, setShowUniversalModal] = useState(false);
  const [orderIsProcessed, setOrderIsProcessed] = useState(false);

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

      setOrderIsProcessed(true);

      setTimeout(() => {
        setOrderIsProcessed(false);
        history(ORDER_ROUTE);
      }, 2000);
    } else {
      setShowUniversalModal(true);
    }
  };

  return (
    <div className="page-basket basket">
      <Container>
        <RemoteBasketDevicesList getBrandType={getBrandType} />

        {basket.devices.ids.length === 0 ? (
          <>
            <h4 className="basket__title mt-2">Корзина пуста</h4>
            <p className="basket__title">
              Для того, чтобы посмотреть список своих заказов -{" "}
              <Link to={user.loggedIn ? ORDER_ROUTE : LOGIN_ROUTE}>
                {user.loggedIn ? "перейдите по ссылке." : "авторизуйтесь."}
              </Link>
            </p>
          </>
        ) : (
          <>
            <Row className="basket__basket-devices basket-devices">
              <div className="basket-devices__title">
                Корзина
                <span className="basket-devices__title_quantity-icon">
                  {basket.totalCount > 99 ? "..." : basket.totalCount}
                </span>
              </div>
              {basket.devices.ids.map((i) => (
                <BasketDeviceItem
                  key={i}
                  device={basket.devices.entities[i]}
                  brand={getBrandType("brand", i)}
                  type={getBrandType("type", i)}
                />
              ))}
            </Row>
            <Row className="basket__total-basket total-basket">
              <Total getBrandType={getBrandType} checkout={checkout} />
            </Row>
            <UniversalModal
              show={showUniversalModal}
              onHide={() => setShowUniversalModal(false)}
              message={messageForUniversalModal}
            />
          </>
        )}
        <SuccesfulExecution
          show={orderIsProcessed}
          onHide={() => setOrderIsProcessed(false)}
          message="Заказ оформлен"
        />
      </Container>
    </div>
  );
});

export default Basket;
