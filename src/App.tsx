import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Component, { loader as componentLoader } from "./routes/component";
import ErrorPage from "./error-page";
import Root, { loader as rootLoader } from "./routes/root";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    //   action: rootAction,
    children: [
      {
        // errorElement: <div>Something went terribly wrong</div>,
        children: [
          { index: true, element: <Home /> },
          {
            path: ":componentId",
            element: <Component />,
            loader: componentLoader,
            //   action: contactAction,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
