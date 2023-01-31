import React, { useContext } from "react";
import { Accordion, Image } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { calculateDataForFieldTotalPageOrderItem } from "../utils/servicesFunction";

const OrderItem = observer(({ id, index }) => {
  const { orders } = useContext(Context);

  const dataForFieldTotal = calculateDataForFieldTotalPageOrderItem(
    orders.orders.entities[id]
  );

  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>
        Заказ от {orders.orders.created[id]}г.
      </Accordion.Header>
      <Accordion.Body>
        <ul className="orders__list">
          {orders.orders.entities[id].map((device) => (
            <li
              key={device.deviceId}
              className="orders__item my-4 d-flex align-items-center justify-content-between"
            >
              <div className="orders__image-name d-flex align-items-center">
                <Image
                  className="orders__image-name_image me-3"
                  src={process.env.REACT_APP_API_URL + "/" + device.img}
                  alt="Device Image"
                />
                <div className="orders__image-name_name">
                  <p>{device.brandName}</p>
                  <p>{device.name}</p>
                </div>
              </div>
              <div className="orders__item_amount">
                <p>{`Количество - ${device.count}шт.`}</p>
                <p>{`Цена - ${device.price}руб.`}</p>
                <p>{`Сумма - ${device.sum}руб.`}</p>
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <div className="orders__total my-4 ms-4 d-flex align-items-center justify-content-between">
          <p>ИТОГО</p>
          <div>
            <p>{`Количество - ${dataForFieldTotal.totalCount}шт.`}</p>
            <p>{`Сумма - ${dataForFieldTotal.totalSum}руб.`}</p>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
});

export default OrderItem;
