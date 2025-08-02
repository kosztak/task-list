import Main from "components/authenticated/Main";
import GroupListPage from "pages/GroupListPage";
import GroupCreationPage from "pages/GroupCreationPage";
import GroupJoinPage from "pages/GroupJoinPage";
import GroupPage from "pages/GroupPage";
import NewTaskPage from "pages/NewTaskPage";
import GroupTaskViewPage from "pages/GroupTaskViewPage";
import EditGroupTaskPage from "pages/EditGroupTaskPage";
import EditGroupInfoPage from "pages/EditGroupInfoPage";

import { loader as mainLoader } from "components/authenticated/Main"
import { loader as groupListLoader } from "pages/GroupListPage";
import { loader as groupCreationLoader } from "pages/GroupCreationPage";
import { loader as groupLoader } from "pages/GroupPage";
import { loader as newTaskLoader } from "pages/NewTaskPage";
import { loader as taskViewPageLoader } from "pages/GroupTaskViewPage";
import { loader as taskEditLoader } from "pages/EditGroupTaskPage";
import { loader as editInfoLoader } from "pages/EditGroupInfoPage";

import { action as groupCreationAction } from "pages/GroupCreationPage";
import { action as groupJoinAction } from "pages/GroupJoinPage";
import { action as newTaskAction } from "pages/NewTaskPage";
import { action as editTaskAction } from "pages/EditGroupTaskPage";
import { action as editInfoAction } from "pages/EditGroupInfoPage";

const groupRoutes = {
    path: '/group',
    element: <Main />,
    loader: mainLoader,
    children: [
        {
            index: true,
            element: <GroupListPage />,
            loader: groupListLoader
        },
        {
            path: 'create',
            element: <GroupCreationPage />,
            action: groupCreationAction,
            loader: groupCreationLoader
        },
        {
            path: "join",
            element: <GroupJoinPage />,
            action: groupJoinAction
        },
        {
            path: ':groupId',
            children: [
                {
                    index: true,
                    element: <GroupPage />,
                    loader: groupLoader
                },
                {
                    path: 'new-task',
                    element: <NewTaskPage isGroupTask={true} />,
                    action: newTaskAction,
                    loader: newTaskLoader
                },
                {
                    path: ':type',
                    children: [
                        {
                            index: true,
                            element: <GroupTaskViewPage />,
                            loader: taskViewPageLoader,
                        },
                        {
                            path: ':taskId',
                            element: <EditGroupTaskPage />,
                            loader: taskEditLoader,
                            action: editTaskAction
                        }
                    ]
                },
                {
                    path: 'edit',
                    element: <EditGroupInfoPage />,
                    loader: editInfoLoader,
                    action: editInfoAction
                }
            ]
        }
    ]
}

export default groupRoutes;