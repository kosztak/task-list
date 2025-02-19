import AuthenticationPage from "../pages/AuthenticationPage";
import LoginPanel from "../components/unauthenticated/Login";
import RegisterPanel from "../components/unauthenticated/Register";

import { loader as authLoader } from "../pages/AuthenticationPage";

import { action as loginAction } from "../components/unauthenticated/Login";
import { action as registerAction } from "../components/unauthenticated/Register";

// contains all authentication routes
const authRoutes = {
    path: '/',
    element: <AuthenticationPage />,
    loader: authLoader,
    children: [
        {
            index: true,
            element: <LoginPanel />,
            action: loginAction
        },
        {
            path: 'register',
            element: <RegisterPanel />,
            action: registerAction
        }
    ]
}

export default authRoutes;