import DailiesPage from "../pages/DailiesPage";
import TodosPage from "../pages/TodosPage";
import UserInfoPage from "../pages/UserInfoPage";
import NewTaskPage from "../pages/NewTaskPage";
import EditUserTaskPage from "../pages/EditUserTaskPage";
import Main from "../components/authenticated/main/Main";

import { loader as mainLoader } from "../components/authenticated/main/Main"
import { loader as userDailiesLoader } from "../pages/DailiesPage";
import { loader as userTodosLoader } from "../pages/TodosPage";
import { loader as editUserTaskLoader } from "../pages/EditUserTaskPage";

import { action as newTaskAction } from "../pages/NewTaskPage";
import { action as editUserTaskAction } from "../pages/EditUserTaskPage";

// contains all user related routes
const userRoutes = {
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

export default userRoutes;