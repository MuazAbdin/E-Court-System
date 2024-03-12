import { Breakdown, CardsDeck } from "../components";

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
      {
        id: 4,
        date: "March 18",
        time: "3:00 PM",
        court: "Jerusalem",
        event: "hearing",
      },
      {
        id: 5,
        date: "April 5",
        time: "9:00 AM",
        court: "Tel Aviv",
        event: "trial",
      },
      {
        id: 6,
        date: "April 23",
        time: "11:00 AM",
        court: "Jerusalem",
        event: "appeal",
      },
      {
        id: 7,
        date: "March 18",
        time: "3:00 PM",
        court: "Jerusalem",
        event: "hearing",
      },
      {
        id: 8,
        date: "April 5",
        time: "9:00 AM",
        court: "Tel Aviv",
        event: "trial",
      },
      {
        id: 9,
        date: "April 23",
        time: "11:00 AM",
        court: "Jerusalem",
        event: "appeal",
      },
      {
        id: 10,
        date: "March 18",
        time: "3:00 PM",
        court: "Jerusalem",
        event: "hearing",
      },
      {
        id: 11,
        date: "April 5",
        time: "9:00 AM",
        court: "Tel Aviv",
        event: "trial",
      },
      {
        id: 12,
        date: "April 23",
        time: "11:00 AM",
        court: "Jerusalem",
        event: "appeal",
      },
    ],
  },
];

function Overview() {
  return (
    <>
      <h3 className="section-title">overview</h3>
      <CardsDeck title={CARD_DECKS[0].title} cards={CARD_DECKS[0].cards} />
      <Breakdown />
    </>
  );
}

export default Overview;
