import Modal from "react-modal";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";
import { Collection } from "./pages/Collection.tsx";
import { Recommendations } from "./pages/Recommendations.tsx";
import { Home } from "./pages/Home.tsx";
import { Toaster } from "react-hot-toast";

import "./index.css";
import { Author } from "./pages/Author.tsx";
import { Support } from "./pages/Support.tsx";
import { TermsAndConditions } from "./pages/TermsAndConditions.tsx";

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
                path: "collection",
                element: <Collection isWishlist={false} />,
            },
            {
                path: "wishlist",
                element: <Collection isWishlist={true} />,
            },
            {
                path: "recommendations",
                element: <Recommendations />,
            },
            {
                path: "author",
                element: <Author />,
            },
            {
                path: "support",
                element: <Support />,
            },
            {
                path: "terms-and-conditions",
                element: <TermsAndConditions />,
            },
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);

Modal.setAppElement("#root");

createRoot(document.getElementById("root")!).render(
    <>
        <Toaster position="top-center" reverseOrder={false} />
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    </>
);
