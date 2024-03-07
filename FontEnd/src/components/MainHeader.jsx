import { Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/MainHeader.js";
import { FaBriefcase, FaCapsules, FaEnvelope, FaFile, FaHouse, FaHouseMedical, FaScaleBalanced } from "react-icons/fa6";
import Logo from "./Logo.jsx";
import ToggleTheme from "./ToggleTheme.jsx";

function MainHeader({ isDark, themeToggle }) {
  return (
    <Wrapper>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <menu>
          <li>
            <FaHouse/>
            <Link to="/">Home</Link>
          </li>
          <li>
            <FaFile />
            <Link to="/cases">Cases</Link>
          </li>
          <li>
            <FaScaleBalanced />
            <Link to="/">Services</Link>
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
