import { Link, useRouteLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/MainHeader.js";
import {
  FaEnvelope,
  FaHouse,
  FaBuildingColumns,
  FaScaleBalanced,
} from "react-icons/fa6";

import Logo from "./Logo.jsx";
import ToggleTheme from "./ToggleTheme.jsx";
import { useState } from "react";

function MainHeader({ isDark, themeToggle }) {
  const [display, setDisplay] = useState("none");

  const toggleDisplay = () => {
    setDisplay((prev) => (prev === "none" ? "flex" : "none"));
  };

  const { userData } = useRouteLoaderData("root");

  return (
    <Wrapper display={display}>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <menu>
          <li>
            <FaHouse />
            <Link
              to={
                ["Lawyer", "Judge"].includes(userData?.userType)
                  ? "/user"
                  : "/user/cases/browse"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <FaBuildingColumns />
            <Link to="/courts">courts</Link>
          </li>
          <li onClick={toggleDisplay}>
            <FaScaleBalanced />
            <span>Services</span>
            <ServicesList />
          </li>
          <li>
            <FaEnvelope />
            <Link to="/">Contact Us</Link>
          </li>
          <li className="theme-btn">
            <ToggleTheme isDark={isDark} themeToggle={themeToggle} />
          </li>
        </menu>
      </nav>
    </Wrapper>
  );
}

export default MainHeader;

const SERVICES = [
  { id: 1, name: "browse cases", link: "/public" },
  { id: 2, name: "file a claim", link: "/user/cases/claim" },
  { id: 3, name: "file a response", link: "/user/cases/respond" },
  { id: 4, name: "review cases", link: "/user/cases" },
];

function ServicesList() {
  return (
    <section className="services-list">
      <menu>
        {SERVICES.map((service) => (
          <li key={service.id}>
            <Link to={service.link}>{service.name}</Link>
          </li>
        ))}
      </menu>
    </section>
  );
}
