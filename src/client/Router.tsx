import { createBrowserRouter } from "react-router-dom";
import React from "react";
import { Root } from "./assets/components/Root";
import DisplayItems from "./assets/components/displayItem";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [{ path: "/:category", element: <DisplayItems /> }],
  },
]);

export default Router;
