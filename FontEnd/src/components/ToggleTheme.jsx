import { BsSunFill, BsMoonFill } from "react-icons/bs";
import Wrapper from "../assets/stylingWrappers/ToggleTheme";

function ToggleTheme({ isDark, themeToggle }) {
  return (
    <Wrapper onClick={themeToggle}>
      {isDark ? (
        <BsSunFill className="toggle-icon" />
      ) : (
        <BsMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
}

export default ToggleTheme;
