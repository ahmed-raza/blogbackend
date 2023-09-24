import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main";
import Profile from "./components/user/Profile";
import { checkAuthLoader, getAccessToken } from "./utils/auth";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: getAccessToken,
    children: [
      { path: "/", element: <Main /> },
      { path: "/my-account", element: <Profile />, loader: checkAuthLoader },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
