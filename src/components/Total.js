import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { deleteBasketDevice } from "../http/basketAPI";

const Total = observer(({ getBrandType = (f) => f, checkout = (f) => f }) => {
  const { user, basket } = useContext(Context);

  const removeAllItemsFromCart = async () => {
    if (user.loggedIn) {
      for (let id of basket.devices.ids) {
        await deleteBasketDevice(basket.basket, id)
          .then((data) => console.log(data.message))
          .catch((e) => console.log(e));
      }
    }

    basket.setTotalCount(0);
    basket.emptyTrash();
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="total-basket_title">ИТОГО</Card.Title>
        <hr />
        <table className="total-basket__table">
          <tbody>
            {basket.devices.ids.map((i) => {
              const device = basket.devices.entities[i];

              if (device.count !== 0) {
                return (
                  <tr key={i}>
                    <td style={{ lineHeight: "220%" }}>{`${getBrandType(
                      "brand",
                      i
                    )} ${device.name}`}</td>

                    <td style={{ textAlign: "end" }}>{`${device.count}шт`}</td>
                    <td style={{ textAlign: "end" }}>{`${
                      device.price * device.count
                    } руб.`}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <hr />
        <div className="total-basket__buttons d-flex justify-content-end">
          <Button
            className="total-basket__buttons_button"
            variant="outline-success"
            onClick={checkout}
          >
            Оформить заказ
          </Button>
          <Button
            className="total-basket__buttons_button"
            variant="outline-danger"
            onClick={removeAllItemsFromCart}
          >
            Удалить все товары из корзины
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});

export default Total;
