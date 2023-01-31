import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "../index";
import Admin from "../pages/Admin";
import Basket from "../pages/Basket";
import Shop from "../pages/Shop";
import Auth from "../pages/Auth";
import DevicePage from "../pages/DevicePage";
import Orders from "../pages/Orders";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  DEVICE_ROUTE,
  ORDER_ROUTE,
} from "../utils/consts";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  const authRoutes = [
    {
      path: ADMIN_ROUTE,
      Component: <Admin />,
    },
    {
      path: ORDER_ROUTE,
      Component: <Orders />,
    },
  ];

  const publicRoutes = [
    {
      path: SHOP_ROUTE,
      Component: <Shop />,
    },
    {
      path: BASKET_ROUTE,
      Component: <Basket />,
    },
    {
      path: LOGIN_ROUTE,
      Component: <Auth />,
    },
    {
      path: REGISTRATION_ROUTE,
      Component: <Auth />,
    },
    {
      path: DEVICE_ROUTE + "/:id",
      Component: <DevicePage />,
    },
  ];

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} exact />
      ))}
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
    </Routes>
  );
});

export default AppRouter;
