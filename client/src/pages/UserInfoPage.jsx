import { Form, redirect, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";

import Input from "components/ui/inputs/Input";
import Button from "components/ui/inputs/Button";

import axiosInstance from "utils/axiosInstance";

import ProfileIcon from "components/ui/icons/ProfileIcon";
import Alert from "components/ui/Alert";

let globalFile;
let alert;

export default function UserInfoPage() {
  const user = useLoaderData();
  const alertRef = useRef();

  useEffect(() => {
    alert = alertRef.current;
  }, [alertRef]);

  function handleFileChange(event) {
    globalFile = event.target.files[0];
  }

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-stretch gap-8">
      <div className="flex items-center gap-8">
        {user.image ? (
          <figure className="w-32 h-32">
            <img
              src={`http://localhost:3000/images/users/${user.image}`}
              alt="Profile picture of user"
              className="!h-full !w-full object-cover rounded-full"
            />
          </figure>
        ) : (
          <ProfileIcon className="w-32 h-32" />
        )}
        <p className="text-dark text-3xl font-bold">{user.name}</p>
      </div>

      <div>
        <p className="text-center text-3xl font-bold">Edit info</p>
        <Form method="POST" className="px-8 flex flex-col gap-4">
          <Alert ref={alertRef} />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            text="Profile image"
          />
          <Input type="text" name="username" text="Username" />
          <div className="flex gap-8">
            <Input type="password" name="password" text="New password" />
            <Input
              type="password"
              name="password-again"
              text="New password again"
            />
          </div>
          <div className="m-auto">
            <Button>Save changes</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function loader({ request, params }) {
  return axiosInstance
    .get("/user/data")
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);

      return Promise.resolve();
    });
}

export async function action({ request, params }) {
  const data = await request.formData();

  if (data.get("password") === data.get("password-again")) {
    const requestData = {
      ...(globalFile && { image: globalFile }),
      ...(data.get("username") !== "" && { username: data.get("username") }),
      ...(data.get("password") !== "" && { password: data.get("password") }),
    };

    return axiosInstance
      .patch("/user/info", requestData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        return redirect("");
      })
      .catch((err) => {
        alert.show(err.response.data.message);

        return Promise.resolve();
      });
  }

  alert.show("Given passwords don't match!");

  return Promise.resolve();
}
