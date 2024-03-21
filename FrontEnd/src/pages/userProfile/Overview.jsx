import { toast } from "react-toastify";
import { Breakdown, CardsDeck } from "../../components";
import { fetcher } from "../../utils/fetcher";
import { useLoaderData } from "react-router-dom";

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
  const { events } = useLoaderData();

  return (
    <>
      <h3 className="section-title">overview</h3>
      <CardsDeck title={CARD_DECKS[0].title} events={events} />
      <Breakdown />
    </>
  );
}

export default Overview;

export async function loader() {
  try {
    const eventsResponse = await fetcher("/events/upcoming/");
    if(!eventsResponse.ok) throw eventsResponse;
    const events = await eventsResponse.json();
    return { events };
  }
  catch(error) {
    toast.error(error.statusText);
    console.log(error);
    return { events: []};
  }
}