import { Outlet, redirect, useLoaderData } from "react-router-dom";

import axiosInstance from "utils/axiosInstance";

import SideBar from "components/authenticated/sidebar/Sidebar";
import Footer from "components/Footer";

export default function Main() {
    const image = useLoaderData();

    return(
        <div className="flex bg-dark">
            <SideBar userImage={image} />

            <div className="min-h-screen flex flex-col gap-8 grow">
                <div className="flex flex-col grow">
                    <p className="text-4xl font-bold text-center p-4 text-yellow sticky top-0">CheckMate</p>

                    <div className="ml-20 mr-8 mb-8 grow">
                        <Outlet />
                    </div>
                </div>

                <Footer/>
            </div>

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