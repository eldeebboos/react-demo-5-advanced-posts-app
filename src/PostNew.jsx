import React from "react";
import { Form, Link, redirect, useLoaderData } from "react-router-dom";
import { createPost } from "./api/posts";
import { getUsers, getUser } from "./api/users";
function PostNew() {
  const users = useLoaderData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Form method="post" className="form">
        <div className="form-row">
          <div className="form-group error">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
            <div className="error-message">Required</div>
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body"></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="..">
            Cancel
          </Link>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
}

async function validatePost(post) {
  if (!post.title) {
    return "Title is required";
  }
  if (!post.body) {
    return "Body is required";
  }
  if (!post.userId) {
    return "User ID is required";
  }
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
  const error = await validatePost(newPost);
  if (error) {
    return error;
  }
  if (newPost.userId === "") {
    return "User ID is required";
  }
  const response = await createPost(newPost);
  return redirect("/posts");
}
export default function postNewRoute() {
  return { action, loader, element: <PostNew /> };
}
