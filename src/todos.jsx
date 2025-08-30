import React, { useEffect, useRef } from "react";
import { Form, Link, useLoaderData, useNavigation } from "react-router-dom";

export default function Todos() {
  const {
    todos,
    searchParams: { query },
  } = useLoaderData();
  const { state } = useNavigation();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);
  return (
    <>
      <h1 className="page-title mb-2">
        Todos
        <div className="title-btns">
          <Link to="new" className="btn">
            Create Todo
          </Link>
        </div>
      </h1>
      <Form className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>
      {state === "submitting" ? (
        "Loading"
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              className={todo.completed ? "strike-through" : ""}
              key={todo.id}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
