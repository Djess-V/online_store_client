import { makeAutoObservable } from "mobx";

export default class OrdersStore {
  constructor() {
    this._orders = { ids: [], created: {}, entities: {} };
    makeAutoObservable(this);
  }

  setOrders(orders) {
    this._orders = orders;
  }

  setFoundOrders(ordersFound, foundOrderRecords) {
    const orders = JSON.parse(ordersFound);

    for (let order of orders) {
      this.setOrder(order, foundOrderRecords[order.id]);
    }
  }

  setOrder(order, orderRecords) {
    const records = JSON.parse(orderRecords);

    const orderData = order.createdAt
      .slice(0, 10)
      .split("-")
      .reverse()
      .join(".");

    this._orders.ids.push(order.id);
    this._orders.created[order.id] = orderData;
    this._orders.entities[order.id] = records;
  }

  get orders() {
    return this._orders;
  }
}
