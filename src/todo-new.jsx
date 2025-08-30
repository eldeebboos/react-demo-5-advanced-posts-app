import React from "react";
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

export default function TodoNew() {
  const errorMessage = useActionData();
  const { state } = useNavigation();
  const isSubmitting = state === "submitting" || state === "loading";
  return (
    <>
      <Form className="form" method="post">
        {errorMessage ? <div className="form-error">{errorMessage}</div> : null}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
        </div>
        <div className="form-btn-row form-row">
          <Link to=".." className="btn btn-outline">
            Back
          </Link>
          <button disabled={isSubmitting} type="submit" className="btn">
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </Form>
    </>
  );
}
