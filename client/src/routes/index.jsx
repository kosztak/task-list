import { createBrowserRouter } from "react-router-dom";

import AuthenticationPage from "../pages/AuthenticationPage";
import DailiesPage from "../pages/DailiesPage";
import TodosPage from "../pages/TodosPage";
import UserInfoPage from "../pages/UserInfoPage";
import LoginPanel from "../components/unauthenticated/Login";
import RegisterPanel from "../components/unauthenticated/Register";
import Main from "../components/authenticated/main/Main";
import NewTaskPage from "../pages/NewTaskPage";
import EditDailyPage from "../pages/EditDailyPage";
import EditTodoPage from "../pages/EditTodoPage";
import EditUserTaskPage from "../pages/EditUserTaskPage";

import { loader as mainLoader } from "../components/authenticated/main/Main"
import { loader as authLoader } from "../pages/AuthenticationPage";
import { loader as userDailiesLoader } from "../pages/DailiesPage";
import { loader as userTodosLoader } from "../pages/TodosPage";
import { loader as editUserTaskLoader } from "../pages/EditUserTaskPage";

import { action as loginAction } from "../components/unauthenticated/Login";
import { action as registerAction } from "../components/unauthenticated/Register";
import { action as newTaskAction } from "../pages/NewTaskPage";
import { action as editUserTaskAction } from "../pages/EditUserTaskPage";

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
                element: <DailiesPage />,
                loader: userDailiesLoader
            },
            {
                path: 'dailies/:taskId',
                element: <EditUserTaskPage />,
                loader: editUserTaskLoader,
                action: editUserTaskAction
            },
            {
                path: 'todos',
                element: <TodosPage />,
                loader: userTodosLoader
            },
            {
                path: 'todos/:taskId',
                element: <EditUserTaskPage />,
                loader: editUserTaskLoader,
                action: editUserTaskAction
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