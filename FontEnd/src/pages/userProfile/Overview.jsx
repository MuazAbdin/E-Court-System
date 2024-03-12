import { Breakdown, CardsDeck } from "../../components";

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
  return (
    <>
      <h3 className="section-title">overview</h3>
      <CardsDeck title={CARD_DECKS[0].title} cards={CARD_DECKS[0].cards} />
      <Breakdown />
    </>
  );
}

export default Overview;
