import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SideBar from "../sidebar/Sidebar";
import axiosInstance from "../../../utils/axiosInstance";

export default function Main() {
    const navigate = useNavigate();
    
    useEffect(() => { // check if user already authorized before using the pages
        axiosInstance.post("/validate-token")
            .then(response => {
            })
            .catch(err => {
                navigate("/auth");
            })
    }, []);

    return(
        <div>
            <SideBar />
            <Outlet />
        </div>
    )
}