import { createBrowserRouter } from "react-router-dom";

import authRoutes from "./auth";
import userRoutes from "./user";
import groupRoutes from "./group";

const router = createBrowserRouter([
    authRoutes,
    userRoutes,
    groupRoutes
]);

export default router;