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
    <div className="page-auth auth">
      <Container
        className="auth__container"
        style={{ height: window.innerHeight - 54 }}
      >
        <Card className="auth__card card-auth">
          <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
          <Form className="d-flex flex-column">
            <Form.Control
              type="email"
              className="mt-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              type="password"
              className="mt-3"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Group className="card-auth__form-group">
              {isLogin ? (
                <div className="card-auth__form-group_link">
                  Нет аккаунта!{" "}
                  <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                </div>
              ) : (
                <div className="card-auth__form-group_link">
                  Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                </div>
              )}

              <Button
                className="card-auth__form-group_button"
                variant={"outline-success"}
                onClick={click}
              >
                {isLogin ? "Войти" : "Регистрация"}
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </div>
  );
});

export default Auth;
