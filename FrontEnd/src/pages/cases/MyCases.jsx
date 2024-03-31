import { loader as catalogLoader } from "../../utils/catalogLoader";
import CaseCatalog from "../../components/CaseCatalog";
import {
  useLoaderData,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { useEffect } from "react";

function MyCases() {
  const navigate = useNavigate();
  const { userData } = useRouteLoaderData("root");

  useEffect(() => {
    if (!userData || !["Lawyer", "Judge"].includes(userData.userType)) {
      navigate("auth/login");
    }
  }, [userData]);

  const { pagesCount, currentPage, cases } = useLoaderData();
  return (
    <CaseCatalog
      pagesCount={pagesCount}
      currentPage={currentPage}
      cases={cases}
    />
  );
}

export default MyCases;

export async function loader({ params, request }) {
  return catalogLoader({ params, request }, "/user");
}
