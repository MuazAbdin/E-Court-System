import { Outlet, useOutletContext } from "react-router-dom";

function LegalEntities() {
  const { userData } = useOutletContext();
  return <Outlet context={{ userData }} />;
}

export default LegalEntities;
