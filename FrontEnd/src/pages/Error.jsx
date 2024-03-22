import { useRouteError } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Error";
import { FaTriangleExclamation } from "react-icons/fa6";
import { useState } from "react";
import { MainFooter, MainHeader } from "../components";

function Error() {
  const [isDark, setIsDark] = useState(getTheme());

  function themeToggle() {
    setIsDark((prevState) => !prevState);
    localStorage.setItem("darkTheme", String(!isDark));
  }

  const error = useRouteError();

  return (
    <div id="app-container" className={isDark ? "dark-theme" : ""}>
      <MainHeader isDark={isDark} themeToggle={themeToggle} />
      <Wrapper>
        <FaTriangleExclamation />
        <div>
          <h1>{error.status}</h1>
          <span>{error.statusText}</span>
        </div>
      </Wrapper>
      <MainFooter />
    </div>
  );
}

export default Error;

function getTheme() {
  const isDark = localStorage.getItem("darkTheme") === "true";
  return isDark;
}
