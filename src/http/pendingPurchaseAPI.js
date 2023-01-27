import { $authHost } from "./index";

export const createPendingPurchase = async (userId, deviceIds) => {
  const { data } = await $authHost.post(`api/pending_purchase`, {
    userId,
    deviceIds,
  });
  return data;
};
