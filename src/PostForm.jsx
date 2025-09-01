import { Form, Link } from "react-router-dom";
import FormGroup from "./FormGroup";

export default function PostForm({
  isSubmitting,
  users,
  errors = {},
  defaultValues = { title: "", body: "", userId: "" },
}) {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup error={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultValues.title}
          />
        </FormGroup>
        <FormGroup error={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup error={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            defaultValue={defaultValues.body}
          ></textarea>
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </Form>
  );
}

export function validatePost(post) {
  const errors = {};
  if (!post.title) {
    errors.title = "Title is required";
  }
  if (!post.body) {
    errors.body = "Body is required";
  }
  if (!post.userId) {
    errors.userId = "User ID is required";
  }
  return errors;
}
