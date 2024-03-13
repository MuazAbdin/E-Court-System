import { Outlet, useOutletContext } from "react-router-dom";

function Stackholders() {
  const { userData } = useOutletContext();
  return <Outlet context={{ userData }} />;
}

export default Stackholders;
