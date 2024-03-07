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
          <Accordion.Item
            id="nav-cases"
            title="cases"
            Icon={FaRegCircleUser}
            subsectoins={[{ name: "browse", to: "" }]}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
