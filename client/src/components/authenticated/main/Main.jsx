import { Outlet, redirect } from "react-router-dom";

import SideBar from "../sidebar/Sidebar";
import axiosInstance from "../../../utils/axiosInstance";

export default function Main() {
    return(
        <div className="grid grid-cols-[8rem_1fr] grid-rows-[4rem_1fr] bg-gray-900" style={{ gridTemplateAreas: `"sidebar title" "sidebar content"` }}>
            <SideBar />
            <p className="text-3xl font-bold text-center text-amber-300 bg-gray-900 sticky top-0" style={{ gridArea: "title" }}>CheckMate</p>
            <Outlet />
        </div>
    )
}

export async function loader() {
    console.log("Main loader");
    
    return axiosInstance.post("/validate-token")
        .then(() => { // check if user already authorized before using the pages
            return Promise.resolve();
        })
        .catch(() => {
            return redirect("/");
        })
}