import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import Navbar from "./navbar";
import Posts from "./Posts";
import Post from "./Post";
import Users from "./users";
import UserDetails from "./UserDetails";
import Todos from "./todos";
import TodoNew from "./todo-new";
import PostNew from "./PostNew";
import postNewRoute from "./PostNew";
import postEditRoute from "./PostEdit";

// const API_URL = "https://jsonplaceholder.typicode.com/";
const API_URL = "http://127.0.0.1:3000";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "*",
            element: <div>404 Page Not Found</div>,
          },
          {
            path: "/",
            element: <Navigate to="posts" />,
          },
          {
            path: "/posts",
            children: [
              {
                index: true,
                loader: async ({ request: { signal } }) => {
                  const response = await fetch(`${API_URL}/posts`, { signal });
                  if (response.status === 200) return await response.json();
                  throw redirect("/");
                },
                element: <Posts />,
              },
              {
                path: ":postId",

                loader: async ({ params, request: { signal } }) => {
                  const response = await fetch(
                    `${API_URL}/posts/${params.postId}?_embed=comments&_expand=user`,
                    {
                      signal,
                    }
                  );
                  if (response.status === 200) return await response.json();
                  throw redirect(".");
                },
                element: <Post />,
              },
              {
                path: "new",
                ...postNewRoute(),
              },
              {
                path: "edit/:postId",
                ...postEditRoute(),
              },
            ],
          },
          {
            path: "/users",
            children: [
              {
                index: true,
                loader: async ({ request: { signal } }) => {
                  const response = await fetch(`${API_URL}/users`, { signal });
                  if (response.status === 200) return await response.json();
                  throw redirect("/");
                },
                element: <Users />,
              },
              {
                path: ":userId",
                loader: async ({ params, request: { signal } }) => {
                  const response = await fetch(
                    `${API_URL}/users/${params.userId}?_embed=posts&_embed=todos`,
                    {
                      signal,
                    }
                  );
                  if (response.status === 200) return await response.json();
                  throw redirect(".");
                },
                element: <UserDetails />,
              },
            ],
          },
          {
            path: "/todos",
            children: [
              {
                index: true,
                loader: async ({ request: { signal, url } }) => {
                  const searchParams = new URL(url).searchParams;
                  const query = searchParams.get("query");
                  let finalUrl = `${API_URL}/todos`;
                  finalUrl = query ? `${finalUrl}?q=${query}` : finalUrl;

                  const response = await fetch(finalUrl, { signal });
                  if (response.status === 200) {
                    return {
                      searchParams: { query },
                      todos: await response.json(),
                    };
                  }
                  throw redirect("/");
                },
                element: <Todos />,
              },
              {
                path: "new",
                element: <TodoNew />,
                action: async ({ request, params }) => {
                  const formData = await request.formData();
                  const newTodo = {
                    title: formData.get("title"),
                  };
                  if (newTodo.title === "") {
                    return "Title is required";
                  }
                  const response = await fetch(`${API_URL}/todos`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newTodo),
                  });
                  if (response.ok) {
                    return redirect("/todos");
                  }
                  throw new Error("Failed to create todo");
                },
              },
            ],
          },
          {
            path: "*",
            element: <div>Wrong test page</div>,
          },
        ],
      },
    ],
  },
]);

function NavLayout() {
  const { state } = useNavigation();

  return (
    <>
      <Navbar /> <ScrollRestoration />
      {state === "loading" && <div className="loading-spinner"></div>}
      <div className={`container ${state === "loading" ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      {" "}
      <h1>Somthing went wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          {" "}
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
