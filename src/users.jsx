import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function Users() {
  const users = useLoaderData();
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => (
          <div className="card" key={user.id}>
            <div className="card-header">{user.name}</div>
            <div className="card-body">
              <div>{user.username}</div>
              <div>{user.website}</div>
              <div>{user.email}</div>
            </div>
            <div className="card-footer">
              <Link className="btn" to={`${user.id}`}>
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
