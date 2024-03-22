import { loader as catalogLoader } from "../../utils/catalogLoader";
import CaseCatalog from "../../components/CaseCatalog";
import { useLoaderData } from "react-router-dom";

function MyCases() {
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
