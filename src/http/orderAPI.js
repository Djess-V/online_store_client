import { $authHost } from "./index";

export const getOrders = async (userId) => {
  const { data } = await $authHost.get(`api/order?userId=${userId}`);
  return data;
};

export const createOrder = async (userId, basketId) => {
  const { data } = await $authHost.post("api/order", { userId, basketId });
  return data;
};
