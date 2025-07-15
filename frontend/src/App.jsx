import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Landing from "./pages/Landing";
import Login from "./features/auth/Login";
import WelcomePage from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import RequireAuth from "./features/auth/requireAuth";
import "./App.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement:<Error/>
    children: [
      { index: true, element: <Landing /> },
      { path: "/login", element: <Login /> },

      // --- protected branch -------------
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        ),
        children: [
          { index: true, element: <WelcomePage /> },
          { path: "notes", element: <NotesList /> },
          { path: "users", element: <UsersList /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
