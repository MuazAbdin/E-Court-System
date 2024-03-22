import { toast } from "react-toastify";
import { fetcher } from "./fetcher";

export async function loader({ params, request }, userTypes) {
  const url = new URL(request.url);
  const searchQuery = {};
  const query = url.searchParams.get("query") || "";
  if (query.trim() !== "") searchQuery.query = query;
  const location = url.searchParams.getAll("location");
  if (location.length > 0 && location[0] !== "")
    searchQuery.location = location;
  const status = url.searchParams.getAll("status");
  if (status.length > 0 && status[0] !== "") searchQuery.status = status;
  const page = parseInt(url.searchParams.get("page") || "1");
  const start = url.searchParams.get("start") || "";
  if (start.trim() !== "") searchQuery.start = start;
  const end = url.searchParams.get("end") || "";
  if (end.trim() !== "") searchQuery.end = end;
  const limit = 10;
  const offset = (page - 1) * limit;

  const serverSearchParams = new URLSearchParams({
    ...searchQuery,
    offset,
    limit,
  });

  let partialURL = "/user";
  for (const admin of ["Court Manager", "Admin"]) {
    for (const user of userTypes) {
      if (admin === user) partialURL = "";
    }
  }

  try {
    const response = await fetcher(
      `/cases${partialURL}/?${serverSearchParams}`
    );
    if (!response.ok) throw response;
    const cases = await response.json();
    return {
      pagesCount: cases.pagesCount,
      currentPage: page,
      cases: cases.result,
    };
  } catch (error) {
    toast.error(error.statusText);
    return {
      pagesCount: 0,
      currentPage: 0,
      cases: [],
    };
  }
}
