import React, { useContext, useState } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
} from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { addBasketDevice } from "../http/basketAPI";
import { getOrders } from "../http/orderAPI";

const Auth = observer(() => {
  const { user, basket, orders } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();

  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(data.user);
      user.setIsAuth(true);
      user.setLoggedIn(true);
      basket.setBasket(data.basket);

      if (basket.devices.ids.length) {
        for (let id of basket.devices.ids) {
          await addBasketDevice(
            data.basket,
            id,
            basket.devices.entities[id].price,
            basket.devices.entities[id].count
          )
            .then((data) => console.log(data.message))
            .catch((e) => console.log(e));
        }

        history(BASKET_ROUTE);
      } else {
        history(SHOP_ROUTE);
      }

      await getOrders(data.user.id)
        .then((data) => {
          if (data.orders) {
            orders.setFoundOrders(data.orders, data.orderRecords);
          }

          console.log(data.message);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            type="email"
            className="mt-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            type="password"
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Group className="d-flex flex-direction-row justify-content-between align-items-center mt-3">
            {isLogin ? (
              <div>
                Нет аккаунта!{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}

            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
