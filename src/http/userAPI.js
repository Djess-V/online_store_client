import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  localStorage.setItem("token", data.token);
  return { user: jwt_decode(data.token), basket: data.basket };
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return { user: jwt_decode(data.token), basket: data.basket };
};

export const check = async () => {
  const { data } = await $authHost.post("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const deleteUser = async (id, email = "") => {
  const { data } = await $authHost.delete(
    `api/user/delete?id=${id}&email=${email}`
  );
  return data;
};
