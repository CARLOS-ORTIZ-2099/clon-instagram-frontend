import { instance } from "../libs/axiosConfig";

// funcion flecha que retorna una promesa
export const registerUser = (data) => instance.post("/auth/register", data);

export const loginUser = (data) =>
  instance.post("/auth/login", data, { withCredentials: true });

export const verifyToken = () => instance.get("/auth/verifyToken");

export const logoutUser = () => instance.get("/auth/logout");

/* falta probar */
export const profileUser = (username) =>
  instance.get("/auth/profile/" + username);

export const searchUser = (username) =>
  instance.get("/auth/user-search?username=" + username);
