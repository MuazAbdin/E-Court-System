import { Search } from "../../components";

function BrowseCases() {
  return <Search />;
}

export default BrowseCases;

export async function action({ request }) {
  const fd = await request.formData();

  try {
    const { data } = await axios.get(`http://localhost:4000/?query=${search}`);
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
