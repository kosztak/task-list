import Main from "../components/authenticated/main/Main";
import GroupListPage from "../pages/GroupListPage";
import GroupCreationPage from "../pages/GroupCreationPage";
import GroupJoinPage from "../pages/GroupJoinPage";
import GroupPage from "../pages/GroupPage";

import { loader as mainLoader } from "../components/authenticated/main/Main"
import { loader as groupListLoader } from "../pages/GroupListPage";
import { loader as groupCreationLoader } from "../pages/GroupCreationPage";
import { loader as groupLoader } from "../pages/GroupPage";

import { action as groupCreationAction } from "../pages/GroupCreationPage";
import { action as groupJoinAction } from "../pages/GroupJoinPage";

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
            element: <GroupPage />,
            loader: groupLoader
        }
    ]
}

export default groupRoutes;