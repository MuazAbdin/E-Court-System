import { toast } from "react-toastify";
import { Breakdown, CardsDeck } from "../../components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useActionData, useLoaderData } from "react-router-dom";
import { fetcher } from "../../utils/fetcher";
dayjs.extend(utc);

function Overview() {
  const actionData = useActionData();
  const counter = actionData ? actionData.counter : {};
  const total = actionData ? actionData.total : 0;
  const { events } = useLoaderData();

  return (
    <>
      <h3 className="section-title">overview</h3>
      <CardsDeck title="upcoming events" events={events} />
      <Breakdown counter={counter} total={total} />
    </>
  );
}

export default Overview;

export async function action({ request }) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()]
      .filter((entry) => entry[0] !== "submit")
      .map((entry) => [entry[0].split("-")[2], entry[1]])
  );

  const reqBody = {
    start: dayjs.utc(data.start, "DD-MM-YYYY").format(),
    end: dayjs.utc(data.end, "DD-MM-YYYY").format(),
  };

  try {
    const response = await fetcher(`/cases/breakdown/`, {
      method: request.method,
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }
    const { result, total } = await response.json();
    const counter = {
      Pending: 0,
      Active: 0,
      Dismissed: 0,
      Settled: 0,
      Appealed: 0,
    };
    result.forEach((r) => (counter[r._id] = r.count));
    return { counter, total };
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
export async function loader() {
  try {
    const eventsResponse = await fetcher("/events/upcoming/");
    if (!eventsResponse.ok) throw eventsResponse;
    const events = await eventsResponse.json();
    return { events };
  } catch (error) {
    toast.error(error.statusText);
    console.log(error);
    return { events: [] };
  }
}
