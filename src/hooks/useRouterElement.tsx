// eslint-disable-next-line react-refresh/only-export-components
// function ProtectedRoute() {
//   // Capitalized the component name
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.user.isAuthenticated
//   );
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// }

import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import React from "react";

// // eslint-disable-next-line react-refresh/only-export-components
// function RejectedRoute() {
//   // Capitalized the component name
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.user.isAuthenticated
//   );
//   return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
// }

function useRouterElement() {
  const routeElement = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/posts/:slug",
      element: <DetailPage />,
    },

    // {
    //   path: "/dashboard",
    //   element: <Dashboard />,
    // },
    // {
    //   path: "/dashboard/user/:id",
    //   element: <EditDashBoard />,
    // },
    // {
    //   path: "forgot-password",
    //   element: <ForgetPassword />,
    // },
    // {
    //   path: "/password-reset/:token",
    //   element: <ResetPassword />,
    // },
    // {
    //   path: "/detail/:id",
    //   element: <DetailPage />,
    // },
    // { path: "/:id", element: <HomePage></HomePage> },
    // {
    //   path: "",
    //   element: <RejectedRoute />, // Updated to use the capitalized name
    //   children: [
    //     {
    //       path: "/login",
    //       element: <LoginPage />,
    //     },

    //     {
    //       path: "/register",
    //       element: <RegisterPage />,
    //     },
    //   ],
    // },
    // {
    //   path: "",
    //   element: <ProtectedRoute />, // Apply the ProtectedRoute for authenticated access
    //   children: [
    //     {
    //       path: "/editBlog",
    //       element: <EditPage />,
    //     },
    //     {
    //       path: "/updateBlog/:id",
    //       element: <UpdatePage></UpdatePage>,
    //     },
    //     {
    //       path: "/profile",
    //       element: <ProfilePage></ProfilePage>,
    //     },
    //   ],
    // },
  ]);
  return routeElement;
}

export default useRouterElement;
