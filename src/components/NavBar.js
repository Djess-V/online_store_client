import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import {
  SHOP_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  BASKET_ROUTE,
  ORDER_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const { user, basket, orders } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();

  const logOut = async () => {
    user.setUser({});
    user.setLoggedIn(false);
    basket.setBasket(null);
    basket.setDevices({ ids: [], entities: {} });
    basket.setRemoteDevices({ ids: [], entities: {} });
    basket.setTotalCount(0);
    orders.setOrders({ ids: [], created: {}, entities: {} });
    history(SHOP_ROUTE);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink className="navbar_navlink" to={SHOP_ROUTE}>
          {location.pathname === "/" ? "Магазин" : "Вернуться в магазин"}
        </NavLink>
        <Nav className="ms-auto me-3">
          {user.loggedIn && (
            <Button
              className="me-3 navbar_navbutton"
              variant={"outline-light"}
              onClick={() => history(ORDER_ROUTE)}
            >
              Мои заказы
              <div className="navbar_quantity-icon">
                {orders.orders.ids.length > 99
                  ? "..."
                  : orders.orders.ids.length}
              </div>
            </Button>
          )}

          <Button
            className="me-3 navbar_navbutton"
            onClick={() => history(BASKET_ROUTE)}
          >
            Корзина
            <div className="navbar_quantity-icon">
              {basket.totalCount > 99 ? "..." : basket.totalCount}
            </div>
          </Button>

          {user.user.role === "ADMIN" && (
            <Button
              className="me-3"
              variant={"outline-light"}
              onClick={() => history(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
          )}
          {user.loggedIn ? (
            <Button variant={"outline-light"} onClick={logOut}>
              Выйти
            </Button>
          ) : (
            <Button
              variant={"outline-light"}
              onClick={() => history(LOGIN_ROUTE)}
            >
              Войти
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
