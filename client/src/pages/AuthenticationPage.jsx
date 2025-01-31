import { Outlet, redirect } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function AuthenticationPage() {
    return(
        <div className="min-h-screen bg-gray-900 flex flex-col items-center">
            <p className="m-12 text-6xl font-bold text-amber-300">CheckMate</p>
            <div className="bg-white p-12 rounded-md w-2/3 max-w-[40rem]">
                <Outlet />
            </div>
        </div>
    );
}

export async function loader() {
    return axiosInstance.post("/validate-token")
        .then(() => { // check if user already authorized before using the pages
            return redirect("/user/dailies");
        })
        .catch(() => {
            return Promise.resolve();
        })
}