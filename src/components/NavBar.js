import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
    <Navbar
      bg="dark"
      expand="lg"
      collapseOnSelect={true}
      variant="dark"
      sticky="top"
    >
      <Container>
        <Link
          className="navbar_navlink"
          onClick={(e) => {
            e.preventDefault();
            history(SHOP_ROUTE);
          }}
        >
          {location.pathname === "/" ? "Магазин" : "Вернуться в магазин"}
        </Link>
        <Navbar.Toggle
          className="navbar_toggle"
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            {user.loggedIn && (
              <Link
                className="me-3 navbar_navlink"
                onClick={(e) => {
                  e.preventDefault();
                  history(ORDER_ROUTE);
                }}
              >
                Мои заказы
                <span className="navbar_quantity-icon">
                  {orders.orders.ids.length > 99
                    ? "..."
                    : orders.orders.ids.length}
                </span>
              </Link>
            )}

            {location.pathname !== "/basket" && (
              <Link
                className="me-3 navbar_navlink"
                onClick={(e) => {
                  e.preventDefault();
                  history(BASKET_ROUTE);
                }}
              >
                Корзина
                <span className="navbar_quantity-icon">
                  {basket.totalCount > 99 ? "..." : basket.totalCount}
                </span>
              </Link>
            )}

            {user.user.role === "ADMIN" && (
              <Link
                className="me-3 navbar_navlink"
                onClick={(e) => {
                  e.preventDefault();
                  history(ADMIN_ROUTE);
                }}
              >
                Админ панель
              </Link>
            )}
            {user.loggedIn ? (
              <Link
                className="navbar_navlink"
                onClick={(e) => {
                  e.preventDefault();
                  logOut();
                }}
              >
                Выйти
              </Link>
            ) : (
              <>
                {location.pathname !== "/registration" &&
                  location.pathname !== "/login" && (
                    <Link
                      className="navbar_navlink"
                      onClick={(e) => {
                        e.preventDefault();
                        history(LOGIN_ROUTE);
                      }}
                    >
                      Войти
                    </Link>
                  )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default NavBar;
