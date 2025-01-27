import { createBrowserRouter } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import DailiesPage from "../pages/DailiesPage";

import LoginPanel from "../components/authentication/Login";
import RegisterPanel from "../components/authentication/Register";
import Main from "../components/main/Main";

const router = createBrowserRouter([
    {
        path: '/auth',
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
        element: <Main />,
        children: [
            {
                index: true,
                element: <DailiesPage />
            }
        ]
    }

]);

export default router;