import { $authHost, $host } from "./index";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const deleteType = async (id, name) => {
  const { data } = await $authHost.delete(`api/type?id=${id}&name=${name}`);
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const deleteBrand = async (id, name) => {
  const { data } = await $authHost.delete(`api/brand?id=${id}&name=${name}`);
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: { typeId, brandId, page, limit },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get(`api/device/${id}`);
  return data;
};

export const deleteDevice = async (id, name) => {
  const { data } = await $authHost.delete(`api/device?id=${id}&name=${name}`);
  return data;
};
