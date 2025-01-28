import { createBrowserRouter } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import DailiesPage from "../pages/DailiesPage";

import LoginPanel from "../components/unauthenticated/Login";
import RegisterPanel from "../components/unauthenticated/Register";
import Main from "../components/authenticated/main/Main";

import { loader as mainLoader } from "../components/authenticated/main/Main"

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
        loader: mainLoader,
        children: [
            {
                index: true,
                element: <DailiesPage />
            }
        ]
    }

]);

export default router;