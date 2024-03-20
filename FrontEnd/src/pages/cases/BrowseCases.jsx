import { Outlet, useLoaderData } from "react-router-dom";
import { Search } from "../../components";
import { fetcher } from "../../utils/fetcher";
import { toast } from "react-toastify";

function BrowseCases() {
  const { casesData } = useLoaderData();

  return <Search cases={casesData} />;
}

export default BrowseCases;

export async function loader() {
  try {
    const response = await fetcher("/cases/");
    if (response.status === 404) return { casesData: [] };
    if (!response.ok) throw response;
    const casesData = (await response.json()) || [];
    return { casesData };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}

export async function action({ request }) {
  const fd = await request.formData();

  try {
    console.log(fd);
    const { data } = await fetcher(`cases/?query=${request.search}`);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
