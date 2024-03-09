import { FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";
import { MdGavel } from "react-icons/md";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function Aside() {
  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={[{ name: "overview", to: "" }]}
          />
          <Accordion.Item
            id="nav-cases"
            title="cases"
            Icon={MdGavel}
            subsectoins={[
              { name: "browse", to: "browse" },
              { name: "create new case", to: "case" },
              { name: "create new document", to: "document" },
            ]}
          />
          <Accordion.Item
            id="nav-court"
            title="court"
            Icon={AccountBalanceIcon}
            subsectoins={[{ name: "create new court", to: "court" }]}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
