import { Breakdown, CardsDeck } from "../../components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useActionData } from "react-router-dom";
import { toast } from "react-toastify";
import { fetcher } from "../../utils/fetcher";
dayjs.extend(utc);

const CARD_DECKS = [
  {
    title: "upcoming events",
    cards: [
      {
        id: 1,
        date: "March 18",
        time: "3:00 PM",
        court: "Jerusalem",
        event: "hearing",
      },
      {
        id: 2,
        date: "April 5",
        time: "9:00 AM",
        court: "Tel Aviv",
        event: "trial",
      },
      {
        id: 3,
        date: "April 23",
        time: "11:00 AM",
        court: "Jerusalem",
        event: "appeal",
      },
    ],
  },
];

function Overview() {
  const actionData = useActionData();
  console.log(actionData);
  const counter = actionData ? actionData.counter : {};
  const total = actionData ? actionData.total : 0;

  return (
    <>
      <h3 className="section-title">overview</h3>
      <CardsDeck title={CARD_DECKS[0].title} cards={CARD_DECKS[0].cards} />
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
  console.log(reqBody);

  try {
    const response = await fetcher(`/cases/breakdown/`, {
      method: request.method,
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      const data = await response.text();
      throw new Error(data);
    }
    const { counter, total } = await response.json();
    return { counter, total };
    // toast.success("");
    // return redirect("");
  } catch (error) {
    toast.error(error.message);
    return error;
  }
}
