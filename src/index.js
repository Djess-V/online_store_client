import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import DevicesStore from "./store/DevicesStore";
import BasketStore from "./store/BasketStore";
import OrdersStore from "./store/OrdersStore";
import "./css/styles.css";

export const Context = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      devices: new DevicesStore(),
      basket: new BasketStore(),
      orders: new OrdersStore(),
    }}
  >
    <App />
  </Context.Provider>
);
