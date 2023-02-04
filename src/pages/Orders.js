import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Container } from "react-bootstrap";
import OrderItem from "../components/orders_components/OrderItem";

const Orders = observer(() => {
  const { orders } = useContext(Context);

  return (
    <div className="page-orders orders">
      <Container>
        <h5 className="ms-3 mt-2">Список заказов:</h5>
        <hr />
        <Accordion defaultActiveKey="0" className="mt-4" flush>
          {orders.orders.ids.map((id, i) => (
            <OrderItem key={id} id={id} index={i} />
          ))}
        </Accordion>
      </Container>
    </div>
  );
});

export default Orders;
