import { $authHost } from "./index";

export const getBasketDevices = async (basketId) => {
  const { data } = await $authHost.get(`api/basket?basketId=${basketId}`);
  return data;
};

export const addBasketDevice = async (
  basketId,
  deviceId,
  price,
  count = undefined
) => {
  const { data } = await $authHost.post(`api/basket`, {
    basketId,
    deviceId,
    price,
    count,
  });
  return data;
};

export const updateBasketDevice = async (basketId, deviceId, field) => {
  const { data } = await $authHost.put(`api/basket`, {
    basketId,
    deviceId,
    field,
  });
  return data;
};

export const deleteBasketDevice = async (basketId, deviceId) => {
  const { data } = await $authHost.delete(
    `api/basket/?basketId=${basketId}&deviceId=${deviceId}`
  );
  return data;
};

export const getBasketDevice = async (basketId, deviceId) => {
  const { data } = await $authHost.get(
    `api/basket/${deviceId}?basketId=${basketId}`
  );
  return data;
};
