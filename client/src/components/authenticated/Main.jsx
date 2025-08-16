import { Outlet, redirect, useLoaderData } from "react-router-dom";

import axiosInstance from "utils/axiosInstance";

import Header from "components/authenticated/header/Header";
import Footer from "components/Footer";

export default function Main() {
  const image = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Header userImage={image} />

      <div className="mx-20 my-8 grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export async function loader() {
  return axiosInstance
    .post("/validate-token")
    .then(() => {
      return axiosInstance.get("/user/image");
    })
    .then((responseData) => {
      return responseData.data.image;
    })
    .catch(() => {
      return redirect("/");
    });
}
