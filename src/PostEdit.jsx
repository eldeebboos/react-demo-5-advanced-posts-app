import React from "react";
import { getPost, updatePost } from "./api/posts";
import { Form, useLoaderData } from "react-router-dom";
import { getUsers } from "./api/users";

function PostEdit() {
  const { users, post } = useLoaderData();
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <Form method="post" action="/posts/2/edit" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId">
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  selected={user.id === post.userId}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <a className="btn btn-outline" href="/posts/2">
            Cancel
          </a>
          <button className="btn">Save</button>
        </div>
      </Form>
    </>
  );
}

async function action({ request, params: { postId } }) {
  const formData = await request.formData();
  const updatedPost = {
    title: formData.get("title"),
    userId: formData.get("userId"),
    body: formData.get("body"),
  };
  if (updatedPost.title === "") {
    return "Title is required";
  }
  if (updatedPost.body === "") {
    return "Body is required";
  }
  if (updatedPost.userId === "") {
    return "User ID is required";
  }
  const response = await updatePost(postId, updatedPost);
  return redirect("/posts");
}

async function loader({ request: { signal }, params: { postId } }) {
  const users = await getUsers({ signal });
  const post = getPost(postId, { signal });
  return { users, post: await post };
}
export default function postEditRoute() {
  return { action, loader, element: <PostEdit /> };
}
