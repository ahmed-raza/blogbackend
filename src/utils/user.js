import axios from "../api/axios";
import { getAccessToken } from "./auth";

export async function getUser() {
  const token = getAccessToken();
  const user = await axios
    .get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch(({ response }) => {
      return response;
    });
  return await user;
}
