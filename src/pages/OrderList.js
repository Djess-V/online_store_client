import React, { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Container } from "react-bootstrap";
import OrderItem from "../components/OrderItem";

const OrderList = observer(() => {
  const { orders } = useContext(Context);

  return (
    <Container>
      <Accordion defaultActiveKey="0" className="mt-4" flush>
        {orders.orders.ids.map((id, i) => (
          <OrderItem key={id} id={id} index={i} />
        ))}
      </Accordion>
    </Container>
  );
});

export default OrderList;
