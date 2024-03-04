import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader.jsx";
import MainFooter from "../components/MainFooter.jsx";
import { ToastContainer } from "react-toastify";

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
