import AuthenticationPage from "pages/AuthenticationPage";
import LoginPanel from "components/unauthenticated/LoginPanel";
import RegisterPanel from "components/unauthenticated/RegisterPanel";

import { loader as authLoader } from "pages/AuthenticationPage";

import { action as loginAction } from "components/unauthenticated/LoginPanel";
import { action as registerAction } from "components/unauthenticated/RegisterPanel";

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