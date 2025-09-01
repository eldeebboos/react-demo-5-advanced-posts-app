import React from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { createPost } from "./api/posts";
import { getUsers, getUser } from "./api/users";
import PostForm, { validatePost } from "./PostForm";
function PostNew() {
  const users = useLoaderData();
  const { state } = useNavigation();

  const errors = useActionData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm
        isSubmitting={state === "submitting"}
        users={users}
        errors={errors}
      />
    </>
  );
}

async function loader({ request: { signal } }) {
  return getUsers({ signal });
}

async function action({ request }) {
  const formData = await request.formData();
  const newPost = {
    title: formData.get("title"),
    userId: formData.get("userId"),
    body: formData.get("body"),
  };
  const error = validatePost(newPost);
  if (Object.keys(error).length > 0) {
    return error;
  }

  const response = await createPost(newPost);
  return redirect("/posts");
}
export default function postNewRoute() {
  return { action, loader, element: <PostNew /> };
}
