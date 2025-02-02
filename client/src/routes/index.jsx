import { createBrowserRouter } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import DailiesPage from "../pages/DailiesPage";
import TodosPage from "../pages/TodosPage";
import UserInfoPage from "../pages/UserInfoPage";
import LoginPanel from "../components/unauthenticated/Login";
import RegisterPanel from "../components/unauthenticated/Register";
import Main from "../components/authenticated/main/Main";
import NewTaskPage from "../pages/NewTaskPage";

import { loader as mainLoader } from "../components/authenticated/main/Main"
import { loader as authLoader } from "../pages/AuthenticationPage";

import { action as loginAction } from "../components/unauthenticated/Login";
import { action as registerAction } from "../components/unauthenticated/Register";
import { action as newTaskAction } from "../pages/NewTaskPage";

const router = createBrowserRouter([
    {
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
    },
    {
        path: '/user',
        element: <Main />,
        loader: mainLoader,
        children: [
            {
                index: true,
                element: <UserInfoPage />
            },
            {
                path: 'dailies',
                element: <DailiesPage />
            },
            {
                path: 'todos',
                element: <TodosPage />
            },
            {
                path: 'new-task',
                element: <NewTaskPage />,
                action: newTaskAction
            }
        ]
    }

]);

export default router;