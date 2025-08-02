import { Outlet, redirect, useLoaderData } from "react-router-dom";

import axiosInstance from "utils/axiosInstance";

import SideBar from "components/authenticated/sidebar/Sidebar";
import Footer from "components/Footer";

export default function Main() {
    const image = useLoaderData();

    return(
        <div className="grid grid-cols-[8rem_1fr] grid-rows-[6rem_1fr] bg-dark" style={{ gridTemplateAreas: `"sidebar title" "sidebar content" "sidebar footer"` }}>
            <SideBar userImage={image} />

            <p className="text-4xl font-bold text-center p-4 text-yellow sticky top-0" style={{ gridArea: "title" }}>CheckMate</p>

            <div className="ml-20 mr-8 mb-8" style={{ gridArea: "content" }}>
                <Outlet />
            </div>

            <Footer/>
        </div>
    )
}

export async function loader() {
    return axiosInstance.post("/validate-token")
        .then(() => {
            return axiosInstance.get("/user/image");
        })
        .then(responseData => {
            return responseData.data.image;
        })
        .catch(() => {
            return redirect("/");
        })
}