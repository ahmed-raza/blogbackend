import axios from "../api/axios";

export async function getPosts() {
  const posts = await axios
    .get("posts")
    .then((response) => {
      return response.data;
    })
    .catch(({ response }) => {
      console.log(response);
      return response;
    });
  return await posts;
}
