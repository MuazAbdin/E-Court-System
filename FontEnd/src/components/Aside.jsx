import { FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";

function Aside() {
  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={[]}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
