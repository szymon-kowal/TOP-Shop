import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { Root } from "./assets/pages/Root";
import DisplayItems from "./assets/components/displayItem";
import DisplaySingleItem from "./assets/components/displaySingleItem";
import ErrorPage from "./assets/components/displayError";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/:category", element: <DisplayItems /> },
      { path: "/:category/:item", element: <DisplaySingleItem /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default Router;
