import { Outlet } from "react-router-dom";
import Wrapper from "../../assets/stylingWrappers/Courts";

function Courts() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}

export default Courts;
