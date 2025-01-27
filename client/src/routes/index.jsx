import { createBrowserRouter } from "react-router-dom";
import AuthenticationPage from "../pages/AuthenticationPage";
import LoginPanel from "../components/authentication/Login";
import RegisterPanel from "../components/authentication/Register";
import Header from "../components/header/Header";

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthenticationPage />,
        children: [
            {
                index: true,
                element: <LoginPanel />
            },
            {
                path: 'register',
                element: <RegisterPanel />
            }
        ]
    },
    {
        path: '/',
        element: <Header />
    }

]);

export default router;