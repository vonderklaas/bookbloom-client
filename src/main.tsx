import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Modal from "react-modal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import MyBooks from "./pages/MyBooks.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "books",
                element: <MyBooks />,
            },
        ],
    },
]);

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
    <UserProvider>
        <RouterProvider router={router} />
    </UserProvider>
);
