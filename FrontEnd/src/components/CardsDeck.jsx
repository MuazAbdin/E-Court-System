import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/CardsDeck";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import dayjs from "dayjs";

function CardsDeck({ title, events }) {
  const selectedRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (dir) => {
    flushSync(() => {
      if (dir === "left" && index > 0) setIndex(index - 1);

      if (dir === "right" && index < events.length - 1) setIndex(index + 1);
    });
    selectedRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const showArrows = events.length > 0;

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
          {events.map((event, i) => (
            <li key={event._id} ref={index === i ? selectedRef : null}>
              <Card {...event} />
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

function Card({ date, location, type }) {
  return (
    <article className="card">
      <div className="date">{dayjs(date).format("DD MMM YYYY")}</div>
      <div className="time">{dayjs(date).format("HH:mm")}</div>
      <div className="court">{location}</div>
      <div className="event">{type}</div>
    </article>
  );
}
