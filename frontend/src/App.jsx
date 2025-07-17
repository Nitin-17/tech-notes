import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Landing from "./pages/Landing";
import Login from "./features/auth/Login";
import WelcomePage from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import RequireAuth from "./features/auth/requireAuth";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
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
            <Prefetch>
              <Outlet />
            </Prefetch>
          </RequireAuth>
        ),
        children: [
          { index: true, element: <WelcomePage /> },
          {
            path: "notes",
            children: [
              { index: true, element: <NotesList /> },
              { path: ":id", element: <EditNote /> },
              { path: "new", element: <NewNote /> },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, element: <UsersList /> },
              { path: ":id", element: <EditUser /> },
              { path: "new", element: <NewUserForm /> },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
