import React from "react";
import { useLoaderData } from "react-router-dom";
import PostItem from "./PostItem";

export default function UserDetails() {
  const user = useLoaderData();

  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b>{" "}
        {`${user.address.street} ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        {user.posts.map((post) => (
          <PostItem {...post} key={post.id} />
        ))}
        <h3 className="mt-4 mb-2">Todos</h3>
        <ul>
          {user.todos.map((todo) => (
            <li
              className={todo.completed ? "strike-through" : ""}
              key={todo.id}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
