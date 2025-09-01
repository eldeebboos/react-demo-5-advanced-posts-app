import React from "react";
import { getPost, updatePost } from "./api/posts";
import {
  Form,
  useLoaderData,
  useActionData,
  useNavigation,
  redirect,
} from "react-router-dom";
import { getUsers } from "./api/users";
import PostForm, { validatePost } from "./PostForm";

function PostEdit() {
  const { users, post } = useLoaderData();
  const { state } = useNavigation();
  const errors = useActionData();
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        isSubmitting={state === "submitting"}
        users={users}
        errors={errors}
        defaultValues={post}
      />
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const users = await getUsers({ signal });
  const post = getPost(postId, { signal });
  return { users, post: await post };
}

async function action({ request, params: { postId } }) {
  const formData = await request.formData();
  const updatedPost = {
    title: formData.get("title"),
    userId: formData.get("userId"),
    body: formData.get("body"),
  };
  const error = validatePost(updatedPost);
  if (Object.keys(error).length > 0) {
    return error;
  }
  const response = await updatePost(postId, updatedPost);
  return redirect("/posts");
}

export default function postEditRoute() {
  return { action, loader, element: <PostEdit /> };
}
