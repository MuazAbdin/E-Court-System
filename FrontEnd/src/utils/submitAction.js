import { redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "./validation";
import { fetcher } from "./fetcher";
import { toast } from "react-toastify";

export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );
  const preSubmitValidation = validateForm(data);
  if (preSubmitValidation.msg === "Invalid inputs") return preSubmitValidation;

  const { url, successMessage, redirectPath } = getFormMetadata(data);
  try {
    const response = await fetcher(url, {
      method: request.method,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }

    toast.success(successMessage);
    return redirect(redirectPath);
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

function getFormMetadata(fields) {
  const fieldsKeys = Object.keys(fields);
  switch (fieldsKeys.length) {
    case 2: // login
      return {
        name: "login",
        url: "/auth/login",
        successMessage: "Logged in successfully",
        redirectPath: "/user/cases",
      };
    case 3:
      return {
        name: "changePassword",
        url: "/users/password",
        successMessage: "Changed successfully",
        redirectPath: "",
      };
    case 7:
      return {
        name: "editDetails",
        url: "/users",
        successMessage: "Updated successfully",
        redirectPath: "",
      };
    default:
      return {
        name: "register",
        url: "/auth/register",
        successMessage: "Registered successfully",
        redirectPath: "/auth/login",
      };
  }
}
