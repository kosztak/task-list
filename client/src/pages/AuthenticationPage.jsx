import { Outlet, redirect } from "react-router-dom";
import axiosInstance from "utils/axiosInstance";

import Footer from "components/Footer";

export default function AuthenticationPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col justify-between">
      <div className="flex flex-col items-center">
        <p className="m-12 text-6xl font-bold text-yellow">CheckMate</p>

        <div className="bg-white p-12 rounded-md w-2/3 max-w-[40rem]">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function loader() {
  return axiosInstance
    .post("/validate-token")
    .then(() => {
      return redirect("/user/dailies");
    })
    .catch(() => {
      return Promise.resolve();
    });
}
