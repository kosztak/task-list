import { Outlet, redirect } from "react-router-dom";

import SideBar from "../sidebar/Sidebar";
import axiosInstance from "../../../utils/axiosInstance";

export default function Main() {
    return(
        <div className="flex bg-gray-900">
            <SideBar />
            <Outlet />
        </div>
    )
}

export async function loader() {
    return axiosInstance.post("/validate-token")
        .then(() => { // check if user already authorized before using the pages
            return Promise.resolve();
        })
        .catch(() => {
            return redirect("/");
        })
}