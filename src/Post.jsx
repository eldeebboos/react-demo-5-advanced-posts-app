import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Post() {
  const post = useLoaderData();
console.log(post);

  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/edit/${post.id}`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{post.user.company.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {post.comments.map((comment) => (
          <div className="card" key={comment.id}>
            <div className="card-body">
              <div className="text-sm mb-1">{comment.email}</div>
              {comment.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
