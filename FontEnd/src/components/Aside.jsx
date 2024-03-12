import { FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";
import { MdGavel } from "react-icons/md";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BalanceIcon from "@mui/icons-material/Balance";

const PROFILE_SECTIONS = [
  { name: "overview", to: "" },
  { name: "edit details", to: "edit-details" },
  { name: "change password", to: "change-password" },
];

function Aside() {
  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={PROFILE_SECTIONS}
          />
          <Accordion.Item
            id="nav-cases"
            title="cases"
            Icon={MdGavel}
            subsectoins={[
              { name: "browse", to: "cases" },
              { name: "add new", to: "cases/add-new" },
            ]}
          />
          <Accordion.Item
            id="nav-court"
            title="court"
            Icon={AccountBalanceIcon}
            subsectoins={[
              // { name: "browse", to: "courts" },
              { name: "add new", to: "courts/add-new" },
            ]}
          />
          <Accordion.Item
            id="nav-legal-entity"
            title="Legal Entity"
            Icon={BalanceIcon}
            subsectoins={[
              { name: "Party", to: "legal-entities/parties" },
              {
                name: "Stakeholder",
                to: "legal-entities/stackholders",
              },
            ]}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
