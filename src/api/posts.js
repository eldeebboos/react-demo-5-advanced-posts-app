import { baseApi } from "./base";

export function getPosts(options, { query, userId }) {
  console.log(query, userId);

  let finalUrl = `/posts?_expand=user`;
  finalUrl = query ? `${finalUrl}&q=${query}` : finalUrl;
  finalUrl = userId ? `${finalUrl}&userId=${userId}` : finalUrl;
  const resuult = baseApi.get(finalUrl, { options }).then((res) => res.data);

  console.log(finalUrl, resuult);

  return resuult;
}

export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export async function createPost(data, options) {
  console.log(data);

  const res = await baseApi.post("/posts", data, options);
  return res.data;
}

export function updatePost(postId, data, options) {
  return baseApi.put(`/posts/${postId}`, data, options).then((res) => res.data);
}

export function deletePost(postId, options) {
  return baseApi.delete(`/posts/${postId}`, options).then((res) => res.data);
}
