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
        <ul>
          {orders.orders.entities[id].map((device) => (
            <li
              key={device.deviceId}
              className="my-4 d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <Image
                  width={50}
                  height={50}
                  className="me-3"
                  src={process.env.REACT_APP_API_URL + "/" + device.img}
                  alt="Device Image"
                />
                <div>
                  {device.brandName} {device.name}
                </div>
              </div>
              <div>
                {`${device.count}шт., по цене - ${device.price}руб., на сумму
        - ${device.sum}руб.`}
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <h5 className="my-4 ms-4 d-flex align-items-center justify-content-between">
          <p>ИТОГО</p>
          <p>
            {`${dataForFieldTotal.totalCount}шт. на сумму
        - ${dataForFieldTotal.totalSum}руб.`}
          </p>
        </h5>
      </Accordion.Body>
    </Accordion.Item>
  );
});

export default OrderItem;
