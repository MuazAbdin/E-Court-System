import { useState } from "react";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import MainHeader from "../components/MainHeader.jsx";
import MainFooter from "../components/MainFooter.jsx";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

function HomeLayout() {
  const [isDark, setIsDark] = useState(getTheme());

  function themeToggle() {
    setIsDark((prevState) => !prevState);
    localStorage.setItem("darkTheme", String(!isDark));
  }

  return (
    <div id="app-container" className={isDark ? "dark-theme" : ""}>
      <ToastContainer position="bottom-left" />
      <MainHeader isDark={isDark} themeToggle={themeToggle} />
      <Outlet />
      <MainFooter />
    </div>
  );
}

export default HomeLayout;

function getTheme() {
  const isDark = localStorage.getItem("darkTheme") === "true";
  return isDark;
}

export async function loader({ request }) {
  try {
    const response = await fetcher("/users/user");
    // if (response.status === 401) return redirect("/");
    if (!response.ok) throw response;
    const data = await response.json();
    const { idNumber: IDcard, phoneNumber: mobile, ...rest } = data;
    const userData = { IDcard, mobile, ...rest };
    return { userData };
  } catch (error) {
    // toast.error(error.message);
    return {};
  }
}
