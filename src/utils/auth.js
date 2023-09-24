import axios from "../api/axios";

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function setAccessToken(accessToken) {
  if (getAccessToken()) {
    localStorage.removeItem("accessToken");
  }
  localStorage.setItem("accessToken", accessToken);
}

export function removeAccessToken() {
  if (localStorage.getItem("accessToken")) {
    localStorage.removeItem("accessToken");
  }
}

export async function register(formdata) {
  const user = await axios
    .post("/register", formdata, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      setAccessToken(response.data.access_token);
      return response.data;
    })
    .catch(({ response }) => {
      return response;
    });
  return await user;
}

export async function login(formdata) {
  const user = await axios
    .post("/login", formdata, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      setAccessToken(response.data.access);
      return response;
    })
    .catch(({ response }) => {
      return response;
    });
  return await user;
}
