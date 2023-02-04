import { $authHost } from "./index";

export const sendRating = async (userId, deviceId, rating) => {
  const { data } = await $authHost.post(`api/rating`, {
    userId,
    deviceId,
    rating,
  });
  return data;
};
