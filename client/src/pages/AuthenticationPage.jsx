import { Outlet } from "react-router-dom";

export default function AuthenticationPage() {
    return(
        <div className="min-h-screen bg-gray-900 flex flex-col items-center">
            <p className="m-12 text-6xl text-amber-300">CheckMate</p>
            <div className="bg-white p-12 rounded-md w-2/3 max-w-[40rem]">
                <Outlet />
            </div>
        </div>
    );
}

