import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/CardsDeck";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";

function CardsDeck({ title, cards }) {
  const selectedRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (dir) => {
    flushSync(() => {
      if (dir === "left" && index > 0) setIndex(index - 1);

      if (dir === "right" && index < cards.length - 1) setIndex(index + 1);
    });
    selectedRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const showArrows = cards.length > 0;

  return (
    <Wrapper>
      <h3 className="title">{title}</h3>
      {showArrows && (
        <button className="arrows left" onClick={() => handleScroll("left")}>
          <FaAnglesLeft />
        </button>
      )}
      <div className="cards-container">
        <menu>
          {cards.map((c, i) => (
            <li key={c.id} ref={index === i ? selectedRef : null}>
              <Card {...c} />
            </li>
          ))}
        </menu>
      </div>
      {showArrows && (
        <button className="arrows right" onClick={() => handleScroll("right")}>
          <FaAnglesRight />
        </button>
      )}
    </Wrapper>
  );
}

CardsDeck.Card = Card;

export default CardsDeck;

function Card({ date, time, court, event }) {
  return (
    <article className="card">
      <div className="date">{date}</div>
      <div className="time">{time}</div>
      <div className="court">{court}</div>
      <div className="event">{event}</div>
    </article>
  );
}
