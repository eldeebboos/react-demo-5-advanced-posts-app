import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi.get("/posts", { options }).then((res) => res.data);
}

export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export async function createPost(data, options) {
  console.log(data);

  const res = await baseApi.post("/posts", data, { options });
  return res.data;
}

export function updatePost(postId, data, options) {
  return baseApi
    .put(`/posts/${postId}`, data, { options })
    .then((res) => res.data);
}

export function deletePost(postId, options) {
  return baseApi
    .delete(`/posts/${postId}`, { options })
    .then((res) => res.data);
}
