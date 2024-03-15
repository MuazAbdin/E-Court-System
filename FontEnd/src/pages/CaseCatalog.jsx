import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/CaseCatalog";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";

function CaseCatalog() {
  const { pagesCount, currentPage, result } = useLoaderData();
  return (
    <Wrapper>
      <h3 className="title">browse cases</h3>
      <StyledSearchBar pagesCount={pagesCount} currentPage={currentPage} />
      {/* <Table /> */}
    </Wrapper>
  );
}

export default CaseCatalog;

export async function loader({ params, request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const location = url.searchParams.getAll("location") || [];
  const status = url.searchParams.getAll("status") || [];
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;
  // console.log({ query, location, status, page, offset, limit });

  const serverSearchParams = new URLSearchParams({
    query,
    location,
    status,
    offset,
    limit,
  });
  console.log(serverSearchParams.toString());
  const data = { pagesCount: 7, currentPage: page, result: [] };
  return data;
}

export async function action({ params, request }) {
  const fd = await request.formData();
  console.log([...fd.entries()]);
  return null;
}
