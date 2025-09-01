import React, { useEffect, useRef } from "react";
import { Form, Link, useLoaderData, useNavigation } from "react-router-dom";
import PostItem from "./PostItem";
import { getUsers } from "./api/users";
import { getPosts } from "./api/posts";
import FormGroup from "./FormGroup";

function Posts() {
  const {
    posts,
    users,
    searchParams: { query, userId },
  } = useLoaderData();

  const { state } = useNavigation();

  const queryRef = useRef();
  const userRef = useRef();
  useEffect(() => {
    queryRef.current.value = query;
    userRef.current.value = userId || "";
  }, [query, userId]);
  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <FormGroup>
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </FormGroup>
          <FormGroup>
            <label htmlFor="userId">Author</label>
            <select
              type="search"
              name="userId"
              id="userId"
              ref={userRef}
              // defaultValue={userId || ""}
            >
              <option value="">Any</option>
              {users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                  {/* {user.company.name} */}
                </option>
              ))}
            </select>
          </FormGroup>
          <button className="btn" disabled={state === "submitting"}>
            Filter
          </button>
        </div>
      </Form>

      <div className="card-grid">
        {posts.map((post) => (
          <PostItem {...post} key={post.id} />
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const userId = searchParams.get("userId");

  const posts = await getPosts({ signal }, { query, userId });
  const users = await getUsers({ signal });
  return { posts, users, searchParams: { query, userId } };
}

export default function postsRoute() {
  return { loader, element: <Posts /> };
}
