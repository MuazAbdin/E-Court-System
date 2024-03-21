import { Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/MainHeader.js";
import {
  FaBriefcase,
  FaCapsules,
  FaEnvelope,
  FaFile,
  FaHouse,
  FaHouseMedical,
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

  return (
    <Wrapper display={display}>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <menu>
          <li>
            <FaHouse />
            <Link to="/user">Home</Link>
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
  { id: 1, name: "case catalog", link: "/catalog" },
  { id: 2, name: "file a claim", link: "/user/cases/claim" },
  { id: 3, name: "file a response", link: "/user/cases/respond" },
  // { id: 4, name: "case judgment", link: "/" },
  // { id: 5, name: "case managment", link: "/" },
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
