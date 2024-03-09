import { FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";
import { MdGavel } from "react-icons/md";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BalanceIcon from '@mui/icons-material/Balance';
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
            Icon={MdGavel}
            subsectoins={[
              { name: "browse", to: "browse" },
              { name: "create new case", to: "case" },
              { name: "create new document", to: "document" },
              { name: "event", to: "event" }
            ]}
          />
          <Accordion.Item
            id="nav-court"
            title="court"
            Icon={AccountBalanceIcon}
            subsectoins={[
              { name: "court form", to: "court" },
            ]}
          />
          <Accordion.Item
            id="nav-legal-entity"
            title="Legal Entity"
            Icon={BalanceIcon}
            subsectoins={[
              { name: "Party", to: "party" },
              { name: "Stakeholder", to: "stakeholder" },
            ]}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
