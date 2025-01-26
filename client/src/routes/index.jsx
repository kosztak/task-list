import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "../pages/AuthenticationPage";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthenticationPage />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
]);

export default router;