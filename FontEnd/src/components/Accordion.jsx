import { createContext, useContext, useState } from "react";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Accordion";

const AccordionContext = createContext({
  openedItemID: "",
  toggleItemID: (id) => {},
});

const useAccordionContext = () => useContext(AccordionContext);

function Accordion({ children }) {
  const [openedItemID, setOpenedItemID] = useState("");

  function toggleItemID(id) {
    setOpenedItemID((prevId) => (prevId === id ? "" : id));
  }

  return (
    <AccordionContext.Provider value={{ openedItemID, toggleItemID }}>
      <Wrapper>{children}</Wrapper>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;

function AccordionItem({ id, title, Icon, subsectoins }) {
  const { openedItemID, toggleItemID } = useAccordionContext();
  const isOpen = openedItemID === id;
  // const disabled = subsectoins.length === 0;
  return (
    <li className={`accordion-item ${isOpen ? "open" : ""}`}>
      <article className="accordion-item-container">
        <h3
          className={`accordion-item__title ${isOpen ? "open" : ""}`}
          onClick={() => toggleItemID(id)}
        >
          <Icon />
          <span>{title}</span>
          {isOpen ? <FaAnglesUp /> : <FaAnglesDown />}
        </h3>
        {isOpen && (
          <menu className="accordion-item__subsections">
            {subsectoins.length > 0 &&
              subsectoins.map((section) => {
                return (
                  <li key={section.name} className="accordion-subsection__item">
                    <NavLink
                      to={section.to}
                      end
                      className={({ isActive }) =>
                        isActive ? "active" : undefined
                      }
                    >
                      {section.name}
                    </NavLink>
                  </li>
                );
              })}
          </menu>
        )}
      </article>
    </li>
  );
}
