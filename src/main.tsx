// main.tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Modal from "react-modal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import MyBooks from "./pages/MyBooks.tsx";
import {Home} from "./pages/Home.tsx";
import MyWishlist from "./pages/MyWishlist.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
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
            {
                path: "wishlist",
                element: <MyWishlist />,
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
